/**
 * Created by durgesh.priyaranjan on 05/05/15.
 */
import FormUtils from "./form-utils";
import PromiseHelper from "plugins/promise";
import RequestHelper from "plugins/request";
import UtilsHelper from "plugins/utils";
import DomHelper from "plugins/dom";
import Model from "plugins/model";
import Validators from "./validator";
import PubSubHelper from "plugins/pubsub";

var BaseInput = (function (_super) {

    // Basic configs
    function BaseInput(config, sandbox) {
        this.config = config;
        this.sandbox = sandbox;
        this.config.type = config.type || "text";
        this.config.uqid = config.uqid || FormUtils.getUid();
        this.config.name = config.name || "";
        this.config.id = config.id || "";
        this.config.class = config.class || "";
        this.config.placeholder = config.placeholder || "";
        this.config.valueList = config.valueList || "";

        // States
        this.config.validationMeta = {
            inProgress: false,
            syncValid: true,
            asyncValid: true,
            errMsg: ""
        };
    }

    BaseInput.prototype.publishEleEvent = function (eventName, data) {
        var self = this;
        PubSubHelper.publish('FORM_BUILDER', eventName, {
            data: data,
            config: self.config
        });
    };

    // Bind Events
    BaseInput.prototype.bindEventEmitters = function () {
        var self = this;
        var field = self.config;

        if (field.eventListeners) {
            field.eventListeners.forEach(function(eventListener){
                self.element.on(eventListener.event, function (e) {
                    self.publishEleEvent.call(this, 'EVENT_LISTENER_' + eventListener.event + '_' + field.name, field);
                    if(eventListener.callback) {
                        var methods = eventListener.callback.split('.');
                        self.parent.dependencies[methods[0]][methods[1]](field.value);
                    }
                });
            });
        }
    };

    BaseInput.prototype.showLoader = function () {
        DomHelper.getDomNode("[uif-field-loader='" + this.config.name + "']").show();
    };

    BaseInput.prototype.hideLoader = function () {
        DomHelper.getDomNode("[uif-field-loader='" + this.config.name + "']").hide();
    };

    BaseInput.prototype.showErrMsg = function () {
        DomHelper.getDomNode("[uif-field-err-message='" + this.config.name + "']").setHtml(this.config.validationMeta.errMsg).show();
    };

    BaseInput.prototype.hideErrMsg = function () {
        DomHelper.getDomNode("[uif-field-err-message='" + this.config.name + "']").setHtml("").hide();
    };

    BaseInput.prototype.addInvalidClass = function () {
        this.element.addClass(this.config.validationFailedClass);
        this.element.removeClass(this.config.validationSuccessClass);

        //Publish Valid Event if provided
        if (this.config.validationFailedEvent) {
            this.publishEleEvent.call(this, this.config.validationFailedEvent, this.config);
        }
    };

    BaseInput.prototype.addValidClass = function (onSubmit) {
        var self = this;
        self.element.addClass(this.config.validationSuccessClass);
        self.element.removeClass(this.config.validationFailedClass);

        //Publish Invalid Event if provided
        if (self.config.validationSuccessEvent) {
            self.publishEleEvent.call(this, this.config.validationSuccessEvent, this.config);
        }

        if (self.config.autoCompleteUpdate && !onSubmit) {
            var query = {};
            query[this.config.autoCompleteUpdate.query] = this.config.value.replace(/\s+/, "");
            var configPromise = new Model({
                fetchApi: this.config.autoCompleteUpdate.api
            }).fetch(query);
            var field = DomHelper.getDomNode('input[name="' + this.config.name + '"]');
            field.addClass(this.config.autoCompleteUpdate.loadingClass);
            configPromise.then(function (data) {
                field.removeClass(self.config.autoCompleteUpdate.loadingClass);
                var fields = self.config.autoCompleteUpdate.fields;
                for (var name in fields) {
                    var ele = DomHelper.getDomNode('input[name="' + fields[name] + '"]');
                    self.parent.formModel.setFieldValue({
                        formName: self.parent.modulePlaceholders.name,
                        value: data[name],
                        uqid: ele.attr('uif-uqid'),
                        valueType: ele.attr('uif-fbtype')
                    }, true);
                    self.parent.publish("FORM_VALIDATE_" + fields[name], {});
                    console.log(name);
                }
            }, function (errresponse) {
                field.removeClass(self.config.autoCompleteUpdate.loadingClass);
                reject(errresponse);
            });
        }
    };

    BaseInput.prototype.addValidationInprogressClass = function () {
        this.element.addClass(this.config.validationInprogressClass);
    };

    BaseInput.prototype.removeValidationInprogressClass = function () {
        this.element.removeClass(this.config.validationInprogressClass);
    };

    BaseInput.prototype.getCustomValidators = function () {
        var self = this,
            localValidators = this.config.validator || [],
            allGlobalValidators = this.globals && this.globals.validators ? this.globals.validators : [];

        self.allValidators = [];

        var globalValidators = UtilsHelper.filter(allGlobalValidators, function (validator) {
            return validator.inheritDownDefault === true;
        });
        globalValidators = globalValidators || [];

        localValidators.forEach(function (localvalidator) {
            localvalidator = typeof (localvalidator) === 'string' ? localvalidator : localvalidator.name;
            var foundValidator = UtilsHelper.filter(allGlobalValidators, function (validator) {
                return validator.name === localvalidator;
            });

            if (foundValidator.length > 0) {
                self.allValidators.push(foundValidator[0]);
            }
            else {
                self.allValidators.push(localvalidator);
            }
        });

        self.allValidators = UtilsHelper.union(self.allValidators, globalValidators);
    };

    BaseInput.prototype.callValidators = function (onSubmit) {
        var self = this,
            validatorPromises = [];

        // Set aync validator loader
        self.config.validationMeta.inProgress = true;
        self.addValidationInprogressClass();
        self.showLoader();

        var getErrorMsg = function (validator) {
            var fieldValidator = self.config.validator.filter(function (val) {
                if (val.name == validator.name)
                    return val;
            })[0];
            if (fieldValidator && fieldValidator.errMessage) {
                return fieldValidator.errMessage;
            }

            if (validator.errMessage) {
                return validator.errMessage;
            }

        };

        self.allValidators.forEach(function (validator) {
            var hidden = self.config.customAttr && self.config.customAttr.hidden || false;
            if (validator && !hidden) {
                var message = getErrorMsg(validator);
                var validatorMethod = self.parent.dependencies[validator.name] || Validators[validator.callMethod];
                if (validator.asyncValidationURL) {
                    validatorPromises.push(validatorMethod(validator.asyncValidationURL, self.config.value, message));
                } else {
                    var config = self.config.type == 'radio' || self.config.type == 'checkbox' ? self.config : undefined;
                    validatorPromises.push(validatorMethod(config || self.config.value, message, self.config.name));
                }
            }
        });

        // errObj should have two keys
        // isValid
        // errMsg
        
        PromiseHelper.all(validatorPromises).then(function (errObj) {
            var foundError = UtilsHelper.filter(errObj, function(errItem) {
                return errItem.isValid === false;
            });
            self.config.validationMeta.inProgress = false;
            self.hideLoader();
            self.removeValidationInprogressClass();

            if (foundError.length) {
                self.parent.formModel.setValidationError(true);
                self.config.validationMeta.syncValid = false;
                self.config.validationMeta.errMsg = foundError[0].errMsg;
                self.showErrMsg();
                self.addInvalidClass();
            } else {
                self.parent.formModel.setValidationError(false);
                self.config.validationMeta.syncValid = true;
                self.config.validationMeta.errMsg = '';
                self.addValidClass(onSubmit);
                self.hideErrMsg();
            }
        });
    };

    BaseInput.prototype.bindAutoValidation = function () {
        var self = this;


        var callValidation = UtilsHelper.debounce(function (onSubmit) {
            self.config.validationMeta.errMsg = "";
            if (self.config.validator && self.config.validator.length > 0)
                self.callValidators(onSubmit);
        }, 700);

        if (!self.config.validateOn) {
            return (function () {
                self.parent.subscribe({
                    callback: function (onSubmit) {
                        callValidation.call(self.config, onSubmit);
                    },
                    eventName: 'FORM_VALIDATE_' + self.config.name
                });
            }());
        }
        return (function () {
            // On user events
            self.element.on(self.config.validateOn, function (e) {
                callValidation.call(self);
            });


            self.parent.subscribe({
                callback: function (onSubmit) {
                    callValidation.call(self.config, onSubmit);
                },
                eventName: 'FORM_VALIDATE_' + self.config.name
            });
        }());
    };


    BaseInput.prototype.initializeDOM = function (value, element) {
        var self = this;

        //Event Emitters
        self.bindEventEmitters();

        // Validate
        self.bindAutoValidation();

        // Validate Using Validators Plugin
        self.getCustomValidators();

        // Add/Change classes accordingly
        // Emit events
        return true;
    };


    return BaseInput;
})(FormUtils);

export default BaseInput;
