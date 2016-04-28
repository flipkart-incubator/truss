/**
 * Created by durgesh.priyaranjan on 05/05/15.
 */

import InputType from "./classes/base-input";
import PromiseHelper from "plugins/promise";
import RequestHelper from "plugins/request";
import UtilsHelper from "plugins/utils";
import DomHelper from "plugins/dom";
import self from "plugins/pubsub";
import Model from "plugins/model";
import FormModel from "./classes/formModel";
import FormUtils from "./classes/form-utils";
import ModuleHelper from "plugins/module";


var formModelInstance = new FormModel(),
    customInputs = {};

// Role: To provide the configuration in following ways:
// 1) If config is provided in instanceConfig [hardcoded]
// 2) If config needs to be fetched from some API
//
// Before Using Config to generate the form config can be modified with "pre.dataProcessorMethod" hook.
// "pre.dataProcessorMethod" expects method in form: "Class.method"
var configFetcher = function () {
    var self = this;

    var configFetcherPromise = PromiseHelper.getPromise(function (resolve, reject) {

        var preProcessData = function (originalConfig, fetchedConfiguration) {
            var mergedConfig;

            if (!(originalConfig && originalConfig.pre && originalConfig.pre.dataProcessorMethod)) {
                console.info("FORM_BUILDER: Resolving data for form without processing: " + originalConfig.name);
                resolve(originalConfig);
            }

            // If "pre.dataProcessorMethod" is present
            if (originalConfig && originalConfig.pre && originalConfig.pre.dataProcessorMethod) {

                var dataProcessorMethods = originalConfig.pre.dataProcessorMethod.split("."),
                    dataProcessorClass = dataProcessorMethods[0],
                    dataProcessorFn = dataProcessorMethods[1],
                    classInstance;

                // Data Processor warnings
                if (dataProcessorMethods.length < 2) {
                    console.warn("FORM_BUILDER: pre.dataProcessorMethod format is not correct, It should be in format 'Class.method' |" + self.modulePlaceholders.pre.dataProcessorMethod);
                }

                if (!self.deps[dataProcessorClass] || !typeof self.deps[dataProcessorClass][dataProcessorFn] === "function") {
                    console.warn("FORM_BUILDER: pre.dataProcessorMethod method is not injected. Form wont be rendered. | " + self.modulePlaceholders.pre.dataProcessorMethod);
                }

                if (self.deps[dataProcessorClass] && typeof self.deps[dataProcessorClass][dataProcessorFn] === "function") {
                    self.deps[dataProcessorClass][dataProcessorFn](fetchedConfiguration || originalConfig, function (updatedConfig) {
                        self.modulePlaceholders = UtilsHelper.assign(originalConfig, updatedConfig);
                        console.info("FORM_BUILDER: Resolving data for form after processing: " + originalConfig.name);
                        resolve(self.modulePlaceholders);
                    });
                }
            }
        };

        if (!self.modulePlaceholders.pre) {
            preProcessData(self.modulePlaceholders);
            return;
        } else {
            if (!self.modulePlaceholders.pre.fetchConfigURL || !self.modulePlaceholders.pre.urlProviderMethod) {
                preProcessData(self.modulePlaceholders);
                return;
            }
        }


        var fetchFromAPI = function (url, query) {

            var configPromise = new Model({
                fetchApi: url
            }).fetch(query);

            configPromise.then(function (config) {
                preProcessData(self.modulePlaceholders, config);
            }, function (errresponse) {
                reject(errresponse);
            });
        };


        // Else fetch from api provided
        var urlProviderMethod = (self.modulePlaceholders.pre && self.modulePlaceholders.pre.urlProviderMethod) ? self.modulePlaceholders.pre.urlProviderMethod.split(".") : [],
            urlProviderClass = (urlProviderMethod.length === 2) ? urlProviderMethod[0] : undefined,
            urlProviderFn = (urlProviderMethod.length === 2) ? urlProviderMethod[1] : undefined,
            urlClassInstance;

        if (self.modulePlaceholders.pre && self.modulePlaceholders.pre.urlProviderMethod) {

            if (self.deps[urlProviderClass] && typeof self.deps[urlProviderClass] === "function") {
                urlClassInstance = new self.deps[urlProviderClass]();
                urlClassInstance[urlProviderFn](self.modulePlaceholders, function (urlConfig) {
                    console.info("FORM_BUILDER: Received config fetch api for: " + self.modulePlaceholders.name);
                    fetchFromAPI(urlConfig.fetchConfigURL, urlConfig.query);
                });
            }
        } else {

            if (!self.modulePlaceholders.pre && !self.modulePlaceholders.pre.fetchConfigURL) {
                console.error("FORM_BUILDER: Config fetcher URL is not defined");
                return;
            }

            fetchFromAPI(self.modulePlaceholders.pre.fetchConfigURL, self.modulePlaceholders.pre && self.modulePlaceholders.pre.queries ? self.modulePlaceholders.pre.queries : undefined);
        }
    });

    return configFetcherPromise;
};

var populateData = function (config, callback) {
    var self = this,
        errsData = {},
        formData = {},
        timeoutInterval = config.submitWithErrors ? 0 : 800;

    setTimeout(function () {
        config.sets.forEach(function (set) {
            set.fields.forEach(function (field) {
                if (field.name && !field.notForSubmit) {
                    if (field.type === 'checkbox' || field.type === 'radio') {
                        field.valueList.forEach(function (ele) {
                            if (ele.selected) {
                                formData[field.name] = ele.value;
                            }
                        });
                    } else {
                        formData[field.name] = field.value || field.valueList;
                    }
                    errsData[field.name] = {
                        syncValid: field.validationMeta.syncValid,
                        asyncValid: field.validationMeta.asyncValid,
                        errMsg: field.validationMeta.errMsg,
                        inProgress: field.validationMeta.inProgress
                    };
                }
            });
        });

        callback({
            errsData: errsData,
            formData: formData
        });
    }, timeoutInterval);
};

var bindFormSubmit = function (config, formTemplate) {

    var self = this,
        preMethods = config.preSubmitMethod ? config.preSubmitMethod.split(".") : null,
        postMethods = config.postSubmitMethod ? config.postSubmitMethod.split(".") : null,
        preSubmission = preMethods ? new self.deps[preMethods[0]]() : null,
        postSubmission = postMethods ? new self.deps[postMethods[0]]() : null;


    var submitFn = function (data, customSubmitUrl) {
        var uri = customSubmitUrl || config.submitUrl;

        if (uri) {
            var postPromise;
            if (typeof data.append === "function") {
                postPromise = RequestHelper.postMultipart(uri, data, {
                    cache: false,
                    processData: false,
                    data: data,
                    dataType: 'html'
                });
            } else {
                postPromise = RequestHelper.postJSON(uri, data);
            }
            self.publish('FORM_SUBMIT_START', config);
            postPromise.then(function (resData) {
                    self.publish('FORM_SUBMIT_COMPLETE', config);
                    // Call PostSubmit
                    if (postSubmission) {
                        config.submitUrl = uri;
                        postSubmission[postMethods[1]].call(self, config, resData);
                    }
                },
                function (resData) {
                    self.publish('FORM_SUBMIT_COMPLETE_ERROR', config);
                    // Call PostSubmit
                    if (postSubmission) {
                        config.submitUrl = uri;
                        postSubmission[postMethods[1]].call(self, config, {error: true, message: resData});
                    }
                });
        }
    };

    var submitForm = function (config, data, customSubmitUrl) {
        var self = this;
        if (preSubmission) {
            preSubmission[preMethods[1]].call(self, config, data, _.curryRight(submitFn)(customSubmitUrl));
        } else {
            submitFn.call(self, data, customSubmitUrl);
        }
    };

    var inProgressCheck = function (config, customSubmitUrl) {
        var self = this;
        self.publish('FORM_VALIDATION_START', config);
        populateData(config, function (data) {
            var validationInProgress, validationError;

            if (config.submitWithErrors) {
                submitForm.call(self, config, data.formData, customSubmitUrl);
            } else {
                validationInProgress = UtilsHelper.filter(data.errsData, function (err) {
                    return err.inProgress === true;
                });

                validationError = UtilsHelper.filter(data.errsData, function (err) {
                    return err.syncValid === false;
                });
                if (validationInProgress.length) {
                    setTimeout(function () {
                        inProgressCheck.call(self, config);
                    }, 1000);
                } else {
                    if (!validationError.length) {
                        submitForm.call(self, config, data.formData, customSubmitUrl);
                    }
                    else {
                        self.publish('FORM_SUBMIT_ERROR', config);
                    }
                }
            }
        });
    };

    var validateFields = function (onSubmit) {
        self.formModel.getFormData(config.name).sets.forEach(function (set) {
            set.fields.forEach(function (field) {
                if (field.name && field.required) {
                    self.publish('FORM_VALIDATE_' + field.name, {onSubmit: onSubmit});
                }
            })
        });
    }

    formTemplate.on("click", "[submit-url], input[type='submit']", function (e) {
        e.preventDefault();
        var customSubmitUrl = DomHelper.getDomNode(e.currentTarget).attr("submit-url"),
            validationRequired = JSON.parse(DomHelper.getDomNode(e.currentTarget).attr("validation-on-click") || "false");
        config.submitWithErrors = !validationRequired;
        inProgressCheck.call(self, config, customSubmitUrl);
        if (validationRequired)
            validateFields(true);
    });

};

var bindValueUpdateEmitters = function (formName, event, emitEventName) {

    var targetDOM = DomHelper.getDomNode(event.currentTarget),
        value = targetDOM.val(),
        uqid = targetDOM.attr("uif-uqid"),
        valueType = targetDOM.attr("uif-fbtype");

    if (targetDOM && targetDOM[0] && targetDOM[0].elem && (targetDOM[0].elem.type === "checkbox")) {
        value = targetDOM[0].elem.checked;
    }

    if (uqid) {
        this.formModel.setFieldValue({
            formName: this.modulePlaceholders.name,
            value: value,
            uqid: uqid,
            valueType: valueType,
            isChecked: targetDOM.is(":checked")
        }, false, emitEventName);
    }
};

var appendSetsInFormTemplate = function (formElement, set) {
    if (!set.el.length) {
        return;
    }

    var setPlaceholder = formElement.find("[uif-append='" + set.name + "']");

    setPlaceholder.forEach(function (foundElement) {
        if (set.defaultVisible === false) {
            foundElement.appendDOM(set.el[0]).hide();
        } else {
            foundElement.appendDOM(set.el[0]);
        }
    });

    // Subscribe for hide event
    if (set.hideOn) {
        self.subscribe({
            eventName: set.hideOn,
            callback: function (data) {
                setPlaceholder.hide();
            }
        });
    }

    // Subscribe for show event
    if (set.showOn) {
        self.subscribe({
            eventName: set.showOn,
            callback: function (data) {
                setPlaceholder.show();
            }
        });
    }
};

var processFormSets = function (config, formTemplate) {

    if (!config.sets || !config.sets.length) {
        console.warn("FORM_BUILDER: Sets are not present in form " + config.name + ". Returning");
        return;
    }

    var self = this,
        globals = config.globals,
        fieldPromiseArr = [];


    config.sets.forEach(function (set, index) {

        //If set has fields
        if (!set.fields || !set.fields.length || !set.template) {
            console.warn("FORM_BUILDER: Set does not have fields or template. Form: " + config.name + ", Set: " + set.name + ". Returning..");
            return;
        }

        // Accumulate all the promises
        fieldPromiseArr.push(PromiseHelper.getPromise(function (resolve, reject) {

            // var templateDetail = FormUtils.getTemplateDetails(set.template, self.getModuleName()),
            //     moduleName = templateDetail.moduleName,
            //     templateName = templateDetail.templateName;

            // // Fetch Template
            // var promise = templateDetail.fullPath ? TemplateHelper.fetchTemplate(templateName) : TemplateHelper.fetchTemplate(moduleName, templateName);

            // promise.then(function(handlebarTemplate) {

                // Compile Template
                var template = set.template(set),
                    customInputModel = [];

                template = DomHelper.getDomNode(template);

                // Insert field element
                set.fields.forEach(function (field, index) {
                    //Build Field Element
                    var newElementInstance = new InputType(field, self, globals);
                    if (field.type === "module") {
                        customInputModel.push(field);
                    }
                    customInputs[set.name] = customInputModel.slice(0);

                    newElementInstance.getHTML().then(function (el) {
                        var elementBlock = template.find("[uif-append='" + field.name + "']");
                        elementBlock.appendDOM(el);
                        if (index == set.fields.length - 1) {
                            resolve()
                        }
                    });
                });// Build all the field element

                set.el = template;
                appendSetsInFormTemplate.call(self, formTemplate, set);
            // }, function () {

            //     reject();
            //     console.error("FORM_BUILDER: Tried fetching template: " + set.template + ", but failed.");
            // });
        }));
    });

    return fieldPromiseArr;
};

var renderCustomElems = function (elements, formName, eventName) {
    if (!Object.keys(elements).length) {
        return;
    }

    var modulesPromises = [],
        self = this;

    UtilsHelper.each(elements, function (elementArr) {
        elementArr.forEach(function (element) {
            element.moduleConfig.container = "." + element.moduleContainerClass;
            modulesPromises.push(ModuleHelper.loadModule(element.moduleName));

            self.subscribe({
                callback: function (data) {
                    self.setFieldData({
                        uqid: element.uqid,
                        overrideData: data,
                        rerender: false,
                        formName: formName,
                        eventName: eventName
                    });
                },
                eventPublisher: "." + element.moduleContainerClass,
                eventName: element.setModuleFieldsEvent
            });
        });
    });

    PromiseHelper.all(modulesPromises).then(function () {
        UtilsHelper.each(elements, function (elementArr) {
            elementArr.forEach(function (element) {
                ModuleHelper.createInstance(element.moduleName, element.moduleConfig, self.getUniqueId());
            });
        });
    });
};

var buildForm = function (config, callback) {
    if (!config.template) {
        console.error("FORM_BUILDER: Template for form " + config.name + " not found. Returning");
        return;
    }

    var self = this;

    var template = config.template(config),
        formGenPromise;

    template = DomHelper.getDomNode(template);
    bindFormSubmit.call(self, config, template);

    formGenPromise = processFormSets.call(self, config, template);

    PromiseHelper.all(formGenPromise).then(function () {
        self.parentNode.setHtml("").appendDOM(template);
        if (callback) {
            callback();
        }
        template.on("change keyup", "input:not([type = 'file'], [type = 'button']), textarea, select", function (e) {
            bindValueUpdateEmitters.call(self, config.name, e, config.formChangeEvent);
        });

        renderCustomElems.call(self, customInputs, config.name, config.formChangeEvent);
    }, function () {
        login.error("Could not resolve promise to render all form items");
    });
};

var reRenderField = function (data) {
    var fieldData = data.eleData,
        formData = data.formData,
        self = this;

    //Build Field Element
    var newElementInstance = new InputType(fieldData, this, formData.globals);

    newElementInstance.getHTML().then(function (el) {
        var elementBlock = DomHelper.getDomNode("[uif-append='" + fieldData.name + "']");
        elementBlock.setHtml("").appendDOM(el);
        self.publish("FORM_FIELD_RE_RENDER", fieldData);
    });
};

var render = function() {
    var self = this;

    this.dependencies = {};
    this.formModel = formModelInstance;
    this.formId = FormUtils.getUid();
    this.parentNode = DomHelper.getDomNode(this.getModuleContainer());
    
    // Get required dependencies
    if (this.modulePlaceholders.globals) {
        
        this.modulePlaceholders.globals.validators && this.modulePlaceholders.globals.validators.forEach((validator) => {
            this.dependencies[validator.name] = validator.callMethod;
        });
        this.modulePlaceholders.globals.dependencies && this.modulePlaceholders.globals.dependencies.forEach((dep) => {
            this.dependencies[dep.name] = dep.callMethod;
        });
    }

    // Start Loader
    if (this.modulePlaceholders.loaderTemplate) {
        this.parentNode.setHtml(self.modulePlaceholders.loaderTemplate);
    }

    self.subscribe({
        callback: function (data) {
            reRenderField.call(self, data);
        },
        eventName: 'FIELD_UPDATED_' + self.modulePlaceholders.name
    });

    return PromiseHelper.getPromise(function (resolve, reject) {
        return configFetcher.call(self).then(function (configuration) {

            buildForm.call(self, configuration, function() {
                self.publish("FORM_RENDER_COMPLETED", configuration);
            });

            // Update moduleplaceholders
            self.formModel.setFormData(configuration.name, configuration);
            resolve();
        });
    });
};

export default {
    hasModuleConfig: false,
    render: render,
    buildForm: buildForm,
    setFieldData: formModelInstance.setFieldData.bind(formModelInstance)
};
