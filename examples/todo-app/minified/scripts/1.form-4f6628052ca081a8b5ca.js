webpackJsonp([1,3],{

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _form_composite = __webpack_require__(99);
	
	var _form_composite2 = _interopRequireDefault(_form_composite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    staticConfig: {
	        routeConfig: [{
	            "appName": "form",
	            "path": "form",
	            "state": "root.form",
	            "module": {
	                "moduleName": "form_composite",
	                "instanceConfig": {
	                    "container": "#content-container",
	                    "placeholders": {}
	                },
	                "instance": _form_composite2.default
	            }
	        }]
	    }
	};

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _dot = __webpack_require__(14);
	
	var _dot2 = _interopRequireDefault(_dot);
	
	var _composite = __webpack_require__(100);
	
	var _composite2 = _interopRequireDefault(_composite);
	
	var _config = __webpack_require__(101);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _reducers = __webpack_require__(121);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	__webpack_require__(123);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    render: function render() {
	        return _dot2.default.call(this, _config2.default.VMConfig, _composite2.default, _reducers2.default);
	    },
	
	    config: _config2.default
	};

/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(69);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<section class=\"todoapp\">\n    <header class=\"header\">\n        <h1>form</h1>\n    </header>\n    <div id=\"form\">\n        \n    </div>\n</section>\n\n<!--h(\"section.todoapp\",[\n    h(\"header.header\",[\n        h(\"h1\", \"form\")\n    ]),\n    h(\"#form\")\n]);-->";
	},"useData":true});

/***/ },

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _form = __webpack_require__(102);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _set = __webpack_require__(103);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _formBuilder = __webpack_require__(104);
	
	var _formBuilder2 = _interopRequireDefault(_formBuilder);
	
	var _validator = __webpack_require__(112);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Form Section in the left is being generated from config present below
	
	exports.default = {
		"modules": [{
			"moduleName": "formBuilder",
			"instance": _formBuilder2.default,
			"instanceConfig": {
				"container": "#form",
				"placeholders": {
					"name": "form",
					"header": "Register Now",
					"subHeader": "Form generated using simple config",
					"template": _form2.default,
					"globals": {
						"validators": [{
							"name": "isRequiredValidator",
							"inheritDownDefault": false,
							"callMethod": _validator2.default.validateIsRequired,
							"errorMessage": "<span class='text-danger'>Field is Required.</span>"
						}, {
							"name": "isEmailValidator",
							"inheritDownDefault": false,
							"callMethod": _validator2.default.validateIsEmail,
							"errorMessage": "<span class='text-danger'>Should be an email.</span>"
						}]
					},
					"sets": [{
						"name": "only-set",
						"template": _set2.default,
						//  Will change the config to generate signup form
						"fields": [{
							"type": "text",
							"label": "Email",
							"name": "email",
							"placeholder": "Enter your email.",
							"class": "form-control",
							"validationType": "sync",
							"validationFailedClass": "error",
							"validator": ["isRequiredValidator"],
							"validateOn": "focusout"
						}, {
							"type": "text",
							"label": "Username",
							"name": "username",
							"class": "form-control"
						}, {
							"type": "select",
							"label": "Country",
							"name": "country",
							"class": "form-control",
							"options": [{
								"label": "Algeria",
								"value": "Algeria"
							}, {
								"label": "Argentina",
								"value": "Argentina"
							}, {
								"label": "Brazil",
								"value": "Brazil"
							}, {
								"label": "Canada",
								"value": "Canada"
							}, {
								"label": "Egypt",
								"value": "Egypt"
							}, {
								"label": "Iceland",
								"value": "Iceland"
							}, {
								"label": "India",
								"value": "India"
							}, {
								"label": "Indonesia",
								"value": "Indonesia"
							}]
						}, {
							"type": "password",
							"label": "Password",
							"name": "password",
							"class": "form-control",
							"placeholder": "Enter password"
						}, {
							"type": "password",
							"label": "Re enter Password",
							"name": "repassword",
							"class": "form-control",
							"placeholder": "Enter password again"
						}, {
							"type": "button",
							"name": "submit",
							"value": "Sign In",
							"class": "btn btn-default",
							"notForSubmit": true,
							"customURL": "/signup"
						}, {
							"type": "button",
							"name": "save",
							"value": "Cancel",
							"class": "btn btn-primary",
							"notForSubmit": true,
							"customURL": "/save"
						}]
					}]
				}
			}
		}],
		VMConfig: {
	
			// Initial store
			store: {},
	
			// Config for DOM Events
			events: {}
		}
	};

	//  thanks for watching.:-)

/***/ },

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(69);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;
	
	  return "<form class=\"form-horizontal custom-form "
	    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
	    + "\" id=\""
	    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\" name=\""
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "\">\n    <h4>"
	    + alias4(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"header","hash":{},"data":data}) : helper)))
	    + "</h4>\n    <p>"
	    + alias4(((helper = (helper = helpers.subHeader || (depth0 != null ? depth0.subHeader : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subHeader","hash":{},"data":data}) : helper)))
	    + "</p>\n    <div uif-append=\"only-set\"></div>\n</form>";
	},"useData":true});

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(69);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;
	
	  return "    <div class=\"form-group\">\n            <label class=\"control-label\" for=\""
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "\">\n                "
	    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.usedFor : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "            </label>\n\n            <div class=\"controls\">\n                <span uif-append=\""
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "\"></span>\n            </div>\n\n            <span uif-field-loader=\""
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "\" class=\"hide help-inline\"> </span>\n            <span uif-field-err-message=\""
	    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
	    + "\" class=\"help-inline error\"></span>\n    </div>\n";
	},"2":function(container,depth0,helpers,partials,data) {
	    var helper;
	
	  return "                <span title=\""
	    + container.escapeExpression(((helper = (helper = helpers.usedFor || (depth0 != null ? depth0.usedFor : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"usedFor","hash":{},"data":data}) : helper)))
	    + "\">?</span>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {};
	
	  return "<div>\n    <legend>"
	    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
	    + "</legend>\n\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.fields : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>";
	},"useData":true});

/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Created by durgesh.priyaranjan on 05/05/15.
	                                                                                                                                                                                                                                                   */
	
	var _baseInput = __webpack_require__(105);
	
	var _baseInput2 = _interopRequireDefault(_baseInput);
	
	var _promise = __webpack_require__(109);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _request = __webpack_require__(110);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _utils = __webpack_require__(67);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _dom = __webpack_require__(64);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _pubsub = __webpack_require__(113);
	
	var _pubsub2 = _interopRequireDefault(_pubsub);
	
	var _model = __webpack_require__(111);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _formModel = __webpack_require__(114);
	
	var _formModel2 = _interopRequireDefault(_formModel);
	
	var _formUtils = __webpack_require__(108);
	
	var _formUtils2 = _interopRequireDefault(_formUtils);
	
	var _module = __webpack_require__(120);
	
	var _module2 = _interopRequireDefault(_module);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var formModelInstance = new _formModel2.default(),
	    customInputs = {};
	
	// Role: To provide the configuration in following ways:
	// 1) If config is provided in instanceConfig [hardcoded]
	// 2) If config needs to be fetched from some API
	//
	// Before Using Config to generate the form config can be modified with "pre.dataProcessorMethod" hook.
	// "pre.dataProcessorMethod" expects method in form: "Class.method"
	var configFetcher = function configFetcher() {
	    var self = this;
	
	    var configFetcherPromise = _promise2.default.getPromise(function (resolve, reject) {
	
	        var preProcessData = function preProcessData(originalConfig, fetchedConfiguration) {
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
	
	                if (!self.deps[dataProcessorClass] || !_typeof(self.deps[dataProcessorClass][dataProcessorFn]) === "function") {
	                    console.warn("FORM_BUILDER: pre.dataProcessorMethod method is not injected. Form wont be rendered. | " + self.modulePlaceholders.pre.dataProcessorMethod);
	                }
	
	                if (self.deps[dataProcessorClass] && typeof self.deps[dataProcessorClass][dataProcessorFn] === "function") {
	                    self.deps[dataProcessorClass][dataProcessorFn](fetchedConfiguration || originalConfig, function (updatedConfig) {
	                        self.modulePlaceholders = _utils2.default.assign(originalConfig, updatedConfig);
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
	
	        var fetchFromAPI = function fetchFromAPI(url, query) {
	
	            var configPromise = new _model2.default({
	                fetchApi: url
	            }).fetch(query);
	
	            configPromise.then(function (config) {
	                preProcessData(self.modulePlaceholders, config);
	            }, function (errresponse) {
	                reject(errresponse);
	            });
	        };
	
	        // Else fetch from api provided
	        var urlProviderMethod = self.modulePlaceholders.pre && self.modulePlaceholders.pre.urlProviderMethod ? self.modulePlaceholders.pre.urlProviderMethod.split(".") : [],
	            urlProviderClass = urlProviderMethod.length === 2 ? urlProviderMethod[0] : undefined,
	            urlProviderFn = urlProviderMethod.length === 2 ? urlProviderMethod[1] : undefined,
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
	
	var populateData = function populateData(config, callback) {
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
	
	var bindFormSubmit = function bindFormSubmit(config, formTemplate) {
	
	    var self = this,
	        preMethods = config.preSubmitMethod ? config.preSubmitMethod.split(".") : null,
	        postMethods = config.postSubmitMethod ? config.postSubmitMethod.split(".") : null,
	        preSubmission = preMethods ? new self.deps[preMethods[0]]() : null,
	        postSubmission = postMethods ? new self.deps[postMethods[0]]() : null;
	
	    var submitFn = function submitFn(data, customSubmitUrl) {
	        var uri = customSubmitUrl || config.submitUrl;
	
	        if (uri) {
	            var postPromise;
	            if (typeof data.append === "function") {
	                postPromise = _request2.default.postMultipart(uri, data, {
	                    cache: false,
	                    processData: false,
	                    data: data,
	                    dataType: 'html'
	                });
	            } else {
	                postPromise = _request2.default.postJSON(uri, data);
	            }
	            self.publish('FORM_SUBMIT_START', config);
	            postPromise.then(function (resData) {
	                self.publish('FORM_SUBMIT_COMPLETE', config);
	                // Call PostSubmit
	                if (postSubmission) {
	                    config.submitUrl = uri;
	                    postSubmission[postMethods[1]].call(self, config, resData);
	                }
	            }, function (resData) {
	                self.publish('FORM_SUBMIT_COMPLETE_ERROR', config);
	                // Call PostSubmit
	                if (postSubmission) {
	                    config.submitUrl = uri;
	                    postSubmission[postMethods[1]].call(self, config, { error: true, message: resData });
	                }
	            });
	        }
	    };
	
	    var submitForm = function submitForm(config, data, customSubmitUrl) {
	        var self = this;
	        if (preSubmission) {
	            preSubmission[preMethods[1]].call(self, config, data, _.curryRight(submitFn)(customSubmitUrl));
	        } else {
	            submitFn.call(self, data, customSubmitUrl);
	        }
	    };
	
	    var inProgressCheck = function inProgressCheck(config, customSubmitUrl) {
	        var self = this;
	        self.publish('FORM_VALIDATION_START', config);
	        populateData(config, function (data) {
	            var validationInProgress, validationError;
	
	            if (config.submitWithErrors) {
	                submitForm.call(self, config, data.formData, customSubmitUrl);
	            } else {
	                validationInProgress = _utils2.default.filter(data.errsData, function (err) {
	                    return err.inProgress === true;
	                });
	
	                validationError = _utils2.default.filter(data.errsData, function (err) {
	                    return err.syncValid === false;
	                });
	                if (validationInProgress.length) {
	                    setTimeout(function () {
	                        inProgressCheck.call(self, config);
	                    }, 1000);
	                } else {
	                    if (!validationError.length) {
	                        submitForm.call(self, config, data.formData, customSubmitUrl);
	                    } else {
	                        self.publish('FORM_SUBMIT_ERROR', config);
	                    }
	                }
	            }
	        });
	    };
	
	    var validateFields = function validateFields(onSubmit) {
	        self.formModel.getFormData(config.name).sets.forEach(function (set) {
	            set.fields.forEach(function (field) {
	                if (field.name && field.required) {
	                    self.publish('FORM_VALIDATE_' + field.name, { onSubmit: onSubmit });
	                }
	            });
	        });
	    };
	
	    formTemplate.on("click", "[submit-url], input[type='submit']", function (e) {
	        e.preventDefault();
	        var customSubmitUrl = _dom2.default.getDomNode(e.currentTarget).attr("submit-url"),
	            validationRequired = JSON.parse(_dom2.default.getDomNode(e.currentTarget).attr("validation-on-click") || "false");
	        config.submitWithErrors = !validationRequired;
	        inProgressCheck.call(self, config, customSubmitUrl);
	        if (validationRequired) validateFields(true);
	    });
	};
	
	var bindValueUpdateEmitters = function bindValueUpdateEmitters(formName, event, emitEventName) {
	
	    var targetDOM = _dom2.default.getDomNode(event.currentTarget),
	        value = targetDOM.val(),
	        uqid = targetDOM.attr("uif-uqid"),
	        valueType = targetDOM.attr("uif-fbtype");
	
	    if (targetDOM && targetDOM[0] && targetDOM[0].elem && targetDOM[0].elem.type === "checkbox") {
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
	
	var appendSetsInFormTemplate = function appendSetsInFormTemplate(formElement, set) {
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
	        _pubsub2.default.subscribe({
	            eventName: set.hideOn,
	            callback: function callback(data) {
	                setPlaceholder.hide();
	            }
	        });
	    }
	
	    // Subscribe for show event
	    if (set.showOn) {
	        _pubsub2.default.subscribe({
	            eventName: set.showOn,
	            callback: function callback(data) {
	                setPlaceholder.show();
	            }
	        });
	    }
	};
	
	var processFormSets = function processFormSets(config, formTemplate) {
	
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
	        fieldPromiseArr.push(_promise2.default.getPromise(function (resolve, reject) {
	
	            // var templateDetail = FormUtils.getTemplateDetails(set.template, self.getModuleName()),
	            //     moduleName = templateDetail.moduleName,
	            //     templateName = templateDetail.templateName;
	
	            // // Fetch Template
	            // var promise = templateDetail.fullPath ? TemplateHelper.fetchTemplate(templateName) : TemplateHelper.fetchTemplate(moduleName, templateName);
	
	            // promise.then(function(handlebarTemplate) {
	
	            // Compile Template
	            var template = set.template(set),
	                customInputModel = [];
	
	            template = _dom2.default.getDomNode(template);
	
	            // Insert field element
	            set.fields.forEach(function (field, index) {
	                //Build Field Element
	                var newElementInstance = new _baseInput2.default(field, self, globals);
	                if (field.type === "module") {
	                    customInputModel.push(field);
	                }
	                customInputs[set.name] = customInputModel.slice(0);
	
	                newElementInstance.getHTML().then(function (el) {
	                    var elementBlock = template.find("[uif-append='" + field.name + "']");
	                    elementBlock.appendDOM(el);
	                    if (index == set.fields.length - 1) {
	                        resolve();
	                    }
	                });
	            }); // Build all the field element
	
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
	
	var renderCustomElems = function renderCustomElems(elements, formName, eventName) {
	    if (!Object.keys(elements).length) {
	        return;
	    }
	
	    var modulesPromises = [],
	        self = this;
	
	    _utils2.default.each(elements, function (elementArr) {
	        elementArr.forEach(function (element) {
	            element.moduleConfig.container = "." + element.moduleContainerClass;
	            modulesPromises.push(_module2.default.loadModule(element.moduleName));
	
	            self.subscribe({
	                callback: function callback(data) {
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
	
	    _promise2.default.all(modulesPromises).then(function () {
	        _utils2.default.each(elements, function (elementArr) {
	            elementArr.forEach(function (element) {
	                _module2.default.createInstance(element.moduleName, element.moduleConfig, self.getUniqueId());
	            });
	        });
	    });
	};
	
	var buildForm = function buildForm(config, callback) {
	    if (!config.template) {
	        console.error("FORM_BUILDER: Template for form " + config.name + " not found. Returning");
	        return;
	    }
	
	    var self = this;
	
	    var template = config.template(config),
	        formGenPromise;
	
	    template = _dom2.default.getDomNode(template);
	    bindFormSubmit.call(self, config, template);
	
	    formGenPromise = processFormSets.call(self, config, template);
	
	    _promise2.default.all(formGenPromise).then(function () {
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
	
	var reRenderField = function reRenderField(data) {
	    var fieldData = data.eleData,
	        formData = data.formData,
	        self = this;
	
	    //Build Field Element
	    var newElementInstance = new _baseInput2.default(fieldData, this, formData.globals);
	
	    newElementInstance.getHTML().then(function (el) {
	        var elementBlock = _dom2.default.getDomNode("[uif-append='" + fieldData.name + "']");
	        elementBlock.setHtml("").appendDOM(el);
	        self.publish("FORM_FIELD_RE_RENDER", fieldData);
	    });
	};
	
	var render = function render() {
	    var _this = this;
	
	    var self = this;
	
	    this.dependencies = {};
	    this.formModel = formModelInstance;
	    this.formId = _formUtils2.default.getUid();
	    this.parentNode = _dom2.default.getDomNode(this.getModuleContainer());
	
	    // Get required dependencies
	    if (this.modulePlaceholders.globals) {
	
	        this.modulePlaceholders.globals.validators && this.modulePlaceholders.globals.validators.forEach(function (validator) {
	            _this.dependencies[validator.name] = validator.callMethod;
	        });
	        this.modulePlaceholders.globals.dependencies && this.modulePlaceholders.globals.dependencies.forEach(function (dep) {
	            _this.dependencies[dep.name] = dep.callMethod;
	        });
	    }
	
	    // Start Loader
	    if (this.modulePlaceholders.loaderTemplate) {
	        this.parentNode.setHtml(self.modulePlaceholders.loaderTemplate);
	    }
	
	    self.subscribe({
	        callback: function callback(data) {
	            reRenderField.call(self, data);
	        },
	        eventName: 'FIELD_UPDATED_' + self.modulePlaceholders.name
	    });
	
	    return _promise2.default.getPromise(function (resolve, reject) {
	        return configFetcher.call(self).then(function (configuration) {
	
	            buildForm.call(self, configuration, function () {
	                self.publish("FORM_RENDER_COMPLETED", configuration);
	            });
	
	            // Update moduleplaceholders
	            self.formModel.setFormData(configuration.name, configuration);
	            resolve();
	        });
	    });
	};
	
	exports.default = {
	    hasModuleConfig: false,
	    render: render,
	    buildForm: buildForm,
	    setFieldData: formModelInstance.setFieldData.bind(formModelInstance)
	};

/***/ },

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extend = __webpack_require__(106);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	var _base = __webpack_require__(107);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _dom = __webpack_require__(64);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _formUtils = __webpack_require__(108);
	
	var _formUtils2 = _interopRequireDefault(_formUtils);
	
	var _formModel = __webpack_require__(114);
	
	var _formModel2 = _interopRequireDefault(_formModel);
	
	var _model = __webpack_require__(111);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _promise = __webpack_require__(109);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FormModel = new _formModel2.default(); /**
	                                            * Created by durgesh.priyaranjan on 05/05/15.
	                                            */
	
	
	var InputType = function (_super) {
	
	    (0, _extend2.default)(InputType, _super);
	
	    function InputType(config, parent, globals) {
	        this.parent = parent;
	        this.globals = globals;
	        _super.call(this, config, parent.deps);
	    }
	
	    InputType.prototype.getHTML = function () {
	        var self = this;
	
	        // TO get the value list count
	        if (this.config && this.config.valueList) {
	            this.config.valueListLengthOBase = this.config.valueList.length - 1;
	        }
	
	        if (!FormModel.constants.templatesMap[this.config.type]) {
	            logit.warn("FORM_BUILDER: Invalid field type specified for:" + this.config.name);
	            return;
	        }
	
	        return new Promise(function (resolve, reject) {
	            var template = self.config.template || FormModel.constants.templatesMap[self.config.type];
	
	            self.element = template(self.config);
	            self.element = _dom2.default.getDomNode(self.element);
	            self.initializeDOM();
	            resolve(self.element);
	        });
	    };
	
	    return InputType;
	}(_base2.default);
	
	exports.default = InputType;

/***/ },

/***/ 106:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by durgesh.priyaranjan on 05/05/15.
	 */
	// To extend one instance from another.
	var __extends = undefined && undefined.__extends || function (childInstance, parentInstance) {
	
	    for (var property in parentInstance) {
	        if (parentInstance.hasOwnProperty(property)) {
	            childInstance[property] = parentInstance[property];
	        }
	    }
	
	    function __() {
	        this.constructor = childInstance;
	    }
	
	    __.prototype = parentInstance.prototype;
	    childInstance.prototype = new __();
	};
	
	exports.default = __extends;

/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _formUtils = __webpack_require__(108);
	
	var _formUtils2 = _interopRequireDefault(_formUtils);
	
	var _promise = __webpack_require__(109);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _request = __webpack_require__(110);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _utils = __webpack_require__(67);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _dom = __webpack_require__(64);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _model = __webpack_require__(111);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _validator = __webpack_require__(112);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	var _pubsub = __webpack_require__(113);
	
	var _pubsub2 = _interopRequireDefault(_pubsub);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by durgesh.priyaranjan on 05/05/15.
	 */
	
	
	var BaseInput = function (_super) {
	
	    // Basic configs
	    function BaseInput(config, sandbox) {
	        this.config = config;
	        this.sandbox = sandbox;
	        this.config.type = config.type || "text";
	        this.config.uqid = config.uqid || _formUtils2.default.getUid();
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
	        _pubsub2.default.publish('FORM_BUILDER', eventName, {
	            data: data,
	            config: self.config
	        });
	    };
	
	    // Bind Events
	    BaseInput.prototype.bindEventEmitters = function () {
	        var self = this;
	        var field = self.config;
	
	        if (field.eventListeners) {
	            field.eventListeners.forEach(function (eventListener) {
	                self.element.on(eventListener.event, function (e) {
	                    self.publishEleEvent.call(this, 'EVENT_LISTENER_' + eventListener.event + '_' + field.name, field);
	                    if (eventListener.callback) {
	                        var methods = eventListener.callback.split('.');
	                        self.parent.dependencies[methods[0]][methods[1]](field.value);
	                    }
	                });
	            });
	        }
	    };
	
	    BaseInput.prototype.showLoader = function () {
	        _dom2.default.getDomNode("[uif-field-loader='" + this.config.name + "']").show();
	    };
	
	    BaseInput.prototype.hideLoader = function () {
	        _dom2.default.getDomNode("[uif-field-loader='" + this.config.name + "']").hide();
	    };
	
	    BaseInput.prototype.showErrMsg = function () {
	        _dom2.default.getDomNode("[uif-field-err-message='" + this.config.name + "']").setHtml(this.config.validationMeta.errMsg).show();
	    };
	
	    BaseInput.prototype.hideErrMsg = function () {
	        _dom2.default.getDomNode("[uif-field-err-message='" + this.config.name + "']").setHtml("").hide();
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
	            var configPromise = new _model2.default({
	                fetchApi: this.config.autoCompleteUpdate.api
	            }).fetch(query);
	            var field = _dom2.default.getDomNode('input[name="' + this.config.name + '"]');
	            field.addClass(this.config.autoCompleteUpdate.loadingClass);
	            configPromise.then(function (data) {
	                field.removeClass(self.config.autoCompleteUpdate.loadingClass);
	                var fields = self.config.autoCompleteUpdate.fields;
	                for (var name in fields) {
	                    var ele = _dom2.default.getDomNode('input[name="' + fields[name] + '"]');
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
	
	        var globalValidators = _utils2.default.filter(allGlobalValidators, function (validator) {
	            return validator.inheritDownDefault === true;
	        });
	        globalValidators = globalValidators || [];
	
	        localValidators.forEach(function (localvalidator) {
	            localvalidator = typeof localvalidator === 'string' ? localvalidator : localvalidator.name;
	            var foundValidator = _utils2.default.filter(allGlobalValidators, function (validator) {
	                return validator.name === localvalidator;
	            });
	
	            if (foundValidator.length > 0) {
	                self.allValidators.push(foundValidator[0]);
	            } else {
	                self.allValidators.push(localvalidator);
	            }
	        });
	
	        self.allValidators = _utils2.default.union(self.allValidators, globalValidators);
	    };
	
	    BaseInput.prototype.callValidators = function (onSubmit) {
	        var self = this,
	            validatorPromises = [];
	
	        // Set aync validator loader
	        self.config.validationMeta.inProgress = true;
	        self.addValidationInprogressClass();
	        self.showLoader();
	
	        var getErrorMsg = function getErrorMsg(validator) {
	            var fieldValidator = self.config.validator.filter(function (val) {
	                if (val.name == validator.name) return val;
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
	                var validatorMethod = self.parent.dependencies[validator.name] || _validator2.default[validator.callMethod];
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
	
	        _promise2.default.all(validatorPromises).then(function (errObj) {
	            var foundError = _utils2.default.filter(errObj, function (errItem) {
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
	
	        var callValidation = _utils2.default.debounce(function (onSubmit) {
	            self.config.validationMeta.errMsg = "";
	            if (self.config.validator && self.config.validator.length > 0) self.callValidators(onSubmit);
	        }, 700);
	
	        if (!self.config.validateOn) {
	            return function () {
	                self.parent.subscribe({
	                    callback: function callback(onSubmit) {
	                        callValidation.call(self.config, onSubmit);
	                    },
	                    eventName: 'FORM_VALIDATE_' + self.config.name
	                });
	            }();
	        }
	        return function () {
	            // On user events
	            self.element.on(self.config.validateOn, function (e) {
	                callValidation.call(self);
	            });
	
	            self.parent.subscribe({
	                callback: function callback(onSubmit) {
	                    callValidation.call(self.config, onSubmit);
	                },
	                eventName: 'FORM_VALIDATE_' + self.config.name
	            });
	        }();
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
	}(_formUtils2.default);
	
	exports.default = BaseInput;

/***/ },

/***/ 108:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by durgesh.priyaranjan on 21/05/15.
	 */
	
	var getUid = function getUid() {
	    function s4() {
	        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	    }
	
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};
	
	var getTemplateDetails = function getTemplateDetails(templateName, currentModuleName) {
	
	    var moduleName = currentModuleName,
	        fullPath = false,
	        templateDetail = templateName.split("/");
	
	    if (templateDetail.length === 2) {
	        moduleName = templateDetail[0];
	        templateName = templateDetail[1];
	    } else if (templateDetail.length > 2) {
	        fullPath = true;
	        moduleName = templateDetail[0];
	        templateName = templateName;
	    }
	
	    return {
	        fullPath: fullPath,
	        moduleName: moduleName,
	        templateName: templateName
	    };
	};
	
	exports.default = {
	    getUid: getUid,
	    getTemplateDetails: getTemplateDetails
	};

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _core = __webpack_require__(2);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _es6Promise = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by durgesh.priyaranjan on 21/05/15.
	 */
	
	
	var detectUncaughtPromise = function detectUncaughtPromise(promise, timeout, prevCaught) {
	    var wrappedPromise = Object.create(promise);
	
	    var chained = false;
	    var stack = new Error().stack;
	
	    wrappedPromise.then = function (onResolved, onRejected) {
	        chained = true;
	        var nextCaught = onRejected ? true : false;
	
	        var newPromise = promise.then(onResolved, onRejected);
	        return detectUncaughtPromise(newPromise, timeout, nextCaught);
	    };
	
	    wrappedPromise.catch = function (errHandler) {
	        chained = true;
	
	        var newPromise = promise.catch(errHandler);
	        return detectUncaughtPromise(newPromise, timeout, true);
	    };
	
	    setTimeout(function () {
	        if (chained) return;
	
	        if (!prevCaught) {
	            console.log('uncaught terminal promise detected.', 'last then() was on:', stack);
	        } else {
	            promise.catch(function (err) {
	                console.log('exception occured inside error handler', 'of last promise chain:', err);
	            });
	        }
	    }, timeout);
	
	    return wrappedPromise;
	};
	
	var promise;
	if (!_core2.default.plugins.promise) {
	    _core2.default.plugins.promise = function () {
	        return {
	
	            getPromise: function getPromise(callback) {
	                var promise = new _es6Promise.Promise(callback);
	                return detectUncaughtPromise(promise, 1000);
	            },
	
	            all: function all() {
	                return _es6Promise.Promise.all.apply(_es6Promise.Promise, arguments);
	            },
	            race: function race() {
	                _es6Promise.Promise.race.apply(_es6Promise.Promise, arguments);
	            },
	            reject: function reject() {
	                _es6Promise.Promise.reject.apply(_es6Promise.Promise, arguments);
	            },
	            resolve: function resolve() {
	                _es6Promise.Promise.resolve.apply(_es6Promise.Promise, arguments);
	            }
	        };
	    }();
	}
	
	promise = _core2.default.plugins.promise;
	
	// Sandbox Extension
	exports.default = {
	    getPromise: promise.getPromise,
	    all: function all() {
	        return promise.all.apply(promise, arguments);
	    },
	    race: function race() {
	        promise.race.apply(promise, arguments);
	    },
	    reject: function reject() {
	        promise.reject.apply(promise, arguments);
	    },
	    resolve: function resolve() {
	        promise.resolve.apply(promise, arguments);
	    }
	};

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _core = __webpack_require__(2);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _jquery = __webpack_require__(66);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _es6Promise = __webpack_require__(3);
	
	var _es6Promise2 = _interopRequireDefault(_es6Promise);
	
	var _utils = __webpack_require__(67);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by puran.kanawat on 31/03/15.
	 */
	
	
	var configuration;
	
	function prepareRequest(config) {
		var promise = _es6Promise2.default.getPromise(function (resolve, reject) {
	
			function resolveRequest(data) {
				completed = true;
				resolve(data);
			}
	
			function rejectRequest(error) {
				completed = true;
				reject(error);
			}
	
			var params = {
				url: config.url,
				method: config.method || "GET",
				dataType: config.dataType || "json",
				data: config.params || {},
				headers: config.headers || {},
				contentType: config.contentType || undefined
			},
			    handlers = {
				success: function success(data, textStatus, jqXhr) {
					if (configuration && configuration.success) {
						configuration.success({
							statusCode: jqXhr.status,
							response: data,
							resolve: resolveRequest,
							reject: rejectRequest
						});
					}
					resolve(data);
				},
				error: function error(jqXhr) {
					if (configuration && configuration.error) {
						configuration.error({
							statusCode: jqXhr.status,
							response: jqXhr.responseJSON || jqXhr.responseText,
							resolve: resolveRequest,
							reject: rejectRequest
						});
					}
					reject(jqXhr.responseJSON || jqXhr.responseText);
				},
				complete: function complete(jqXhr) {
					if (configuration && configuration.complete) {
						configuration.complete({
							statusCode: jqXhr.status,
							response: jqXhr.responseJSON || jqXhr.responseText,
							resolve: resolveRequest,
							reject: rejectRequest
						});
					}
					config.canceller && config.canceller.resolve();
				}
			},
			    completed = false,
			    xhr;
	
			if (configuration && configuration.start) {
				configuration.start({
					params: params,
					resolve: resolveRequest,
					reject: rejectRequest
				});
			}
	
			if (params.contentType && params.contentType.indexOf('application/json') >= -1) {
				try {
					params.data = JSON.stringify(params.data);
				} catch (e) {
					console.error("contentType for ajax call set to application/json but the content is not json");
				}
			}
	
			if (!completed) {
				xhr = _jquery2.default.ajax(_utils2.default.extend(params, handlers));
				if (config.canceller) {
					config.canceller.promise.then(function () {}, function () {
						xhr.abort();
					});
				}
			} else {
				config.canceller && config.canceller.resolve();
			}
		});
	
		return promise;
	}
	
	function getJSON(url, params, options) {
		options = options || {};
		options = _.extend(options, {
			url: url,
			method: "GET",
			params: params
		});
		return prepareRequest(options);
	}
	
	function postJSON(url, params, options) {
		options = options || {};
		options = _.extend(options, {
			url: url,
			method: "POST",
			params: params
		});
		return prepareRequest(options);
	}
	
	function putJSON(url, params, options) {
		options = options || {};
		options = _.extend(options, {
			url: url,
			method: "PUT",
			params: params
		});
		return prepareRequest(options);
	}
	
	function deleteJSON(url, params, options) {
		options = options || {};
		options = _.extend(options, {
			url: url,
			method: "DELETE",
			params: params
		});
		return prepareRequest(options);
	}
	
	function ajax(config) {
		return prepareRequest(config);
	}
	
	function getQueryStringForObject(o) {
		if (o) {
			return _jquery2.default.param(o);
		} else {
			return '';
		}
	}
	
	function configure(config) {
		configuration = config;
	}
	
	exports.default = {
		getJSON: getJSON,
		postJSON: postJSON,
		ajax: ajax,
		putJSON: putJSON,
		deleteJSON: deleteJSON,
		getQueryStringForObject: getQueryStringForObject,
		configure: configure
	};

/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(110);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Model(config) {
	    this.fetchApi = config.fetchApi;
	    this.updateApi = config.updateApi;
	    this.deleteApi = config.deleteApi;
	    this.value = null;
	}
	
	Model.prototype = function () {
	
	    function fetch(params) {
	        var self = this,
	            url;
	
	        if (params) {
	            url = this.fetchApi + '?' + _request2.default.getQueryStringForObject(params);
	        } else {
	            url = this.fetchApi;
	        }
	
	        return _request2.default.getJSON(url).then(function (data) {
	            this.value = data;
	            return data;
	        });
	    }
	
	    function update(payload) {
	        return _request2.default.postJSON(this.updateApi, payload);
	    }
	
	    function del(payload) {
	        return _request2.default.postJSON(this.updateApi, payload);
	    }
	
	    return {
	        fetch: fetch,
	        update: update,
	        del: del
	    };
	}();
	
	exports.default = Model;

/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _promise = __webpack_require__(109);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    validateIsRequired: function validateIsRequired(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (!value) {
	            valObj.isValid = false;
	            valObj.errMsg = message || "required field";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsSpaceNotAllowed: function validateIsSpaceNotAllowed(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (!value.trim()) {
	            valObj.isValid = false;
	            valObj.errMsg = message || "Empty spaces not allowed";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsPositiveNumber: function validateIsPositiveNumber(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        },
	            regex = /^[0-9]*$/;
	        if (!value.match(regex)) {
	            valObj.isValid = false;
	            valObj.errMsg = message || "invalid value";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsZero: function validateIsZero(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (value == 0) {
	            valObj.isValid = false;
	            valObj.errMsg = message || "can not be zero";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsPan: function validateIsPan(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (!value.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)) {
	            valObj.isValid = false;
	            valObj.errMsg = message || "not a valid PAN";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsTan: function validateIsTan(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        },
	            regex = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z])$/;
	        if (!value.match(regex) && value != 'Not Available') {
	            valObj.isValid = false;
	            valObj.errMsg = message || "not a valid TAN";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsTin: function validateIsTin(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (!value.match(/^[0-9]{11}[cCvVsS]?$|^[0-9]{9}[cCvV][cCvV]?$/) && value != 'Not Available') {
	            valObj.isValid = false;
	            valObj.errMsg = message || "not a valid VAT/TIN";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsCin: function validateIsCin(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (!value.match(/^[a-zA-Z0-9]{21}?$/) && value != 'Not Available') {
	            valObj.isValid = false;
	            valObj.errMsg = message || "not a valid CIN";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsAlphaNumeric: function validateIsAlphaNumeric(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (!value.match(/^[0-9a-zA-Z\s]*$/)) {
	            valObj.isValid = false;
	            valObj.errMsg = message || "accepts only alpha numeric characters";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsAlpha: function validateIsAlpha(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (!value.match(/^[a-zA-Z\s]*$/)) {
	            valObj.isValid = false;
	            valObj.errMsg = message || "accepts only alphabets";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsIFSC: function validateIsIFSC(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	        if (!value.match(/^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/)) {
	            valObj.isValid = false;
	            valObj.errMsg = message || "Please enter a valid IFSC code";
	        }
	        return _promise2.default.getPromise(function (resolve, reject) {
	            resolve(valObj);
	        });
	    },
	    validateIsEmail: function validateIsEmail(value, message) {
	        var valObj = {
	            isValid: true,
	            errMsg: ''
	        };
	
	        return _promise2.default.getPromise(function (resolve, reject) {
	            if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
	                valObj.isValid = false;
	                valObj.errMsg = message || "not a valid email id";
	                resolve(valObj);
	            } else {
	                resolve(valObj);
	            }
	        });
	    }
	};

/***/ },

/***/ 113:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _core = __webpack_require__(2);
	
	var _core2 = _interopRequireDefault(_core);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		publish: function publish(publisher, eventName, message) {
			_core2.default.publish(publisher, eventName, message);
		},
		subscribe: function subscribe(subscription) {
			_core2.default.subscribe(subscription);
		},
		unsubscribe: function unsubscribe(subscriber, eventName, callback) {
			_core2.default.unsubscribe(subscriber, eventName, callback);
		}
	}; /**
	    * A Plugin extends core and sandbox, NOT JUST CORE
	    * Sandbox needs to be extended to access the new core methods
	    *
	    * A plugin can be used in multiple ways:
	    * -By a plugin
	    * -By a module
	    */

/***/ },

/***/ 114:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _utils = __webpack_require__(67);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _pubsub = __webpack_require__(113);
	
	var _pubsub2 = _interopRequireDefault(_pubsub);
	
	var _baseElementInput = __webpack_require__(115);
	
	var _baseElementInput2 = _interopRequireDefault(_baseElementInput);
	
	var _baseElementSelect = __webpack_require__(117);
	
	var _baseElementSelect2 = _interopRequireDefault(_baseElementSelect);
	
	var _baseElementTextarea = __webpack_require__(118);
	
	var _baseElementTextarea2 = _interopRequireDefault(_baseElementTextarea);
	
	var _baseCustomElement = __webpack_require__(119);
	
	var _baseCustomElement2 = _interopRequireDefault(_baseCustomElement);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function FormModel() {
	    if (FormModel.prototype._singletonInstance) {
	        return FormModel.prototype._singletonInstance;
	    }
	    FormModel.prototype._singletonInstance = this;
	    this.formData = {};
	    this.validationError = false;
	    this.dataStateStorage = 2;
	}
	
	FormModel.prototype = function () {
	    var CONST = {
	        templatesMap: {
	            text: _baseElementInput2.default,
	            "number": _baseElementInput2.default,
	            range: _baseElementInput2.default,
	            date: _baseElementInput2.default,
	            color: _baseElementInput2.default,
	            email: _baseElementInput2.default,
	            tel: _baseElementInput2.default,
	            hidden: _baseElementInput2.default,
	            password: _baseElementInput2.default,
	            file: _baseElementInput2.default,
	            submit: _baseElementInput2.default,
	            reset: _baseElementInput2.default,
	            button: _baseElementInput2.default,
	            checkbox: _baseElementInput2.default,
	            radio: _baseElementInput2.default,
	            select: _baseElementSelect2.default,
	            textarea: _baseElementTextarea2.default,
	            "module": _baseCustomElement2.default
	        }
	    };
	
	    // latestLevel starts with 1.
	    var getFormData = function getFormData(formName, latestLevel) {
	        var formDataArr = this.formData[formName];
	
	        if (!latestLevel || !(formDataArr.length - latestLevel > -1)) {
	            latestLevel = formDataArr.length - 1;
	        }
	
	        return formDataArr[latestLevel];
	    };
	
	    var setFormData = function setFormData(formName, data) {
	        if (!this.formData[formName]) {
	            this.formData[formName] = [];
	        }
	
	        if (this.formData[formName].length < this.dataStateStorage) {
	            this.formData[formName].push(data);
	        } else {
	            this.formData[formName].shift();
	            this.formData[formName].push(data);
	        }
	
	        if (data.formChangeEvent) {
	            _pubsub2.default.publish(null, data.formChangeEvent, {
	                eleData: undefined,
	                formData: data
	            });
	        }
	
	        return getFormData.call(this, formName);
	    };
	
	    var getField = function getField(setArray, uqid) {
	        var fieldIndex, fieldInSetIndex;
	
	        function iterateInFields(fieldArr, fielduqid, setIndex) {
	            fieldIndex = _utils2.default.findIndex(fieldArr, function (field) {
	                var uidData = fielduqid.split("--"),
	                    uid = uidData[0];
	                return field.uqid === uid;
	            });
	            fieldInSetIndex = setIndex;
	        }
	
	        function iterateInSets(setsArr, fielduqid, setIndex) {
	            if (setsArr[setIndex] && setsArr[setIndex].fields) {
	                iterateInFields(setsArr[setIndex].fields, fielduqid, setIndex);
	            }
	
	            if (setIndex < setsArr.length && (fieldIndex === undefined || fieldIndex === -1)) {
	                iterateInSets(setsArr, fielduqid, ++setIndex);
	            }
	        }
	
	        iterateInSets(setArray, uqid, 0);
	
	        return {
	            setIndex: fieldInSetIndex,
	            fieldIndex: fieldIndex
	        };
	    };
	
	    var getFieldData = function getFieldData(formName, uquid) {
	        var formData = this.getFormData(formName),
	            foundField,
	            foundFieldDetails = getField(formData.sets, uquid);
	
	        if (formData.sets.length > foundFieldDetails.setIndex) {
	
	            //If field is present
	            if (formData.sets[foundFieldDetails.setIndex].fields.length > foundFieldDetails.fieldIndex) {
	                foundField = formData.sets[foundFieldDetails.setIndex].fields[foundFieldDetails.fieldIndex];
	            }
	        }
	        return foundField;
	    };
	
	    var setFieldValue = function setFieldValue(fieldData, rerender, emitEvent) {
	
	        if (!fieldData) {
	            return;
	        }
	
	        var uidData = fieldData.uqid.split("--"),
	            uid = uidData[0],
	            index = uidData[1] || 0;
	
	        var foundField = getFieldData.call(this, fieldData.formName, uid);
	        var formData = getFormData.call(this, fieldData.formName);
	        if (!foundField) {
	            return;
	        }
	
	        if (fieldData.valueType === "element") {
	            if (foundField.valueList) {
	                if (foundField.type === "radio" || foundField.type === "checkbox") {
	                    foundField.valueList.forEach(function (item) {
	                        if (item.value == fieldData.value) {
	                            item.selected = true;
	                        } else {
	                            item.selected = false;
	                        }
	                    });
	                } else if (foundField.valueList.length > index) {
	                    foundField.valueList[index].value = fieldData.value;
	                } else {
	                    foundField.valueList.push({ value: fieldData.value });
	                }
	            } else {
	                foundField.value = fieldData.value;
	            }
	        }
	
	        if (fieldData.valueType === "qualifier") {
	            if (foundField.valueList && foundField.valueList.length) {
	                foundField.valueList[index].qualifier = fieldData.value;
	            } else {
	                foundField.valueList = [{
	                    value: foundField.value || "",
	                    qualifier: fieldData.value
	                }];
	                foundField.value = undefined;
	            }
	        }
	
	        if (rerender) {
	            _pubsub2.default.publish('FORM_BUILDER', 'FIELD_UPDATED_' + formData.name, {
	                eleData: foundField,
	                formData: formData
	            });
	        }
	
	        if (emitEvent) {
	            _pubsub2.default.publish('FORM_BUILDER', emitEvent, {
	                eleData: foundField,
	                formData: formData
	            });
	        }
	    };
	
	    var setFieldData = function setFieldData(formName, uquid, overrideData, rerender, eventName) {
	
	        // If object is provided
	        if ((typeof formName === "undefined" ? "undefined" : _typeof(formName)) === "object") {
	            uquid = formName.uqid;
	            overrideData = formName.overrideData;
	            rerender = formName.rerender;
	            eventName = formName.eventName;
	            formName = formName.formName;
	        }
	
	        if (typeof overrideData === "string") {
	            overrideData = {
	                value: overrideData
	            };
	        }
	
	        var formData = getFormData.call(this, formName);
	
	        var foundData = getFieldData.call(this, formName, uquid);
	        foundData = _utils2.default.assign(foundData, overrideData);
	        if (rerender) {
	            _pubsub2.default.publish('FORM_BUILDER', 'FIELD_UPDATED_' + formData.name, {
	                eleData: foundData,
	                formData: formData
	            });
	        }
	
	        if (eventName) {
	            _pubsub2.default.publish('FORM_BUILDER', eventName, {
	                eleData: foundData,
	                formData: formData
	            });
	        }
	    };
	
	    function setValidationError(validationError) {
	        this.validationError = validationError;
	    }
	
	    function getValidationError() {
	        return this.validationError;
	    }
	
	    return {
	        setFormData: setFormData,
	        getFormData: getFormData,
	        constants: CONST,
	        setFieldValue: setFieldValue,
	        getFieldData: getFieldData,
	        setFieldData: setFieldData,
	        setValidationError: setValidationError,
	        getValidationError: getValidationError
	    };
	}();
	
	exports.default = FormModel;

/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(69);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.valueList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return "    <div class=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.fieldWrapperClass : depth0), depth0))
	    + "\" uif-fbtype=\"wrapper\" "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n\n        <input "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " uif-fbtype=\"element\" "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.type),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.readOnly),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.hidden),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.placeholder),{"name":"if","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depths[1] != null ? depths[1].min : depths[1]),{"name":"if","hash":{},"fn":container.program(19, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.max),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.step),{"name":"if","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.value : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.autofocus),{"name":"if","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.autocomplete),{"name":"if","hash":{},"fn":container.program(29, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.maxlength),{"name":"if","hash":{},"fn":container.program(31, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.name),{"name":"if","hash":{},"fn":container.program(33, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1["class"]),{"name":"if","hash":{},"fn":container.program(35, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.id),{"name":"if","hash":{},"fn":container.program(37, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.formnovalidate),{"name":"if","hash":{},"fn":container.program(39, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.customURL : depth0),{"name":"if","hash":{},"fn":container.program(41, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.validationOnclick : depth0),{"name":"if","hash":{},"fn":container.program(43, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers.each.call(alias1,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(47, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "/>\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":container.program(49, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.qualifier),{"name":"if","hash":{},"fn":container.program(52, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n\n\n"
	    + ((stack1 = helpers["if"].call(alias1,(data && data.last),{"name":"if","hash":{},"fn":container.program(57, data, 0, blockParams, depths),"inverse":container.program(60, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholder),{"name":"if","hash":{},"fn":container.program(63, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.insertErrorPlaceholder),{"name":"if","hash":{},"fn":container.program(65, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias1,(data && data.index),"!==",((stack1 = (data && data.root)) && stack1.valueListLengthOBase),{"name":"check","hash":{},"fn":container.program(67, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n    </div>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return " uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"5":function(container,depth0,helpers,partials,data) {
	    return "id=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
	    + "\"";
	},"7":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "type=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.type), depth0))
	    + "\" ";
	},"9":function(container,depth0,helpers,partials,data) {
	    return "type=\"text\"";
	},"11":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " disabled=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.disabled), depth0))
	    + "\"";
	},"13":function(container,depth0,helpers,partials,data) {
	    return "  readOnly";
	},"15":function(container,depth0,helpers,partials,data) {
	    return "  hidden";
	},"17":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " placeholder=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.placeholder), depth0))
	    + "\"";
	},"19":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " min=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.min), depth0))
	    + "\"";
	},"21":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " max=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.max), depth0))
	    + "\"";
	},"23":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " step=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.step), depth0))
	    + "\"";
	},"25":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " value=\""
	    + ((stack1 = container.lambda((depth0 != null ? depth0.value : depth0), depth0)) != null ? stack1 : "")
	    + "\"";
	},"27":function(container,depth0,helpers,partials,data) {
	    return " autofocus";
	},"29":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " autocomplete=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.autocomplete), depth0))
	    + "\"";
	},"31":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " maxlength=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.maxlength), depth0))
	    + "\"";
	},"33":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " name=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.name), depth0))
	    + "\"";
	},"35":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1["class"]), depth0))
	    + "\"";
	},"37":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " id=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.id), depth0))
	    + "\"";
	},"39":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " formnovalidate=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.formnovalidate), depth0))
	    + "\"";
	},"41":function(container,depth0,helpers,partials,data) {
	    return "submit-url=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.customURL : depth0), depth0))
	    + "\"";
	},"43":function(container,depth0,helpers,partials,data) {
	    return " validation-on-click=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.validationOnclick : depth0), depth0))
	    + "\" ";
	},"45":function(container,depth0,helpers,partials,data) {
	    return " checked=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.selected : depth0), depth0))
	    + "\"";
	},"47":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda;
	
	  return container.escapeExpression(alias1((data && data.key), depth0))
	    + "=\""
	    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
	    + "\"";
	},"49":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "        <label "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">"
	    + ((stack1 = container.lambda((depth0 != null ? depth0.label : depth0), depth0)) != null ? stack1 : "")
	    + "</label>\n";
	},"50":function(container,depth0,helpers,partials,data) {
	    return "for=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
	    + "\"";
	},"52":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"if","hash":{},"fn":container.program(53, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"53":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSeparatorClass), depth0))
	    + "\"></span>\n            <select uif-fbtype=\"qualifier\" "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSelectClass), depth0))
	    + "\" "
	    + ((stack1 = helpers.each.call(alias3,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(47, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"each","hash":{},"fn":container.program(54, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "            </select>\n";
	},"54":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                <option value=\""
	    + alias2(alias1(depth0, depth0))
	    + "\"\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,helpers.lookup.call(alias3,depths[1],"qualifier",{"name":"lookup","hash":{},"data":data}),"===",depth0,{"name":"check","hash":{},"fn":container.program(55, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">"
	    + alias2(alias1(depth0, depth0))
	    + "</option>\n";
	},"55":function(container,depth0,helpers,partials,data) {
	    return "                        selected\n                        ";
	},"57":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showAddInputField),{"name":"if","hash":{},"fn":container.program(58, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"58":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputSeparatorClass), depth0))
	    + "\"></span>\n            <input type=\"button\" class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\" data-val=\"value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"60":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showRemoveField),{"name":"if","hash":{},"fn":container.program(61, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"61":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldSeparatorClass), depth0))
	    + "\"></span>\n            <input type=\"button\" class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldValue), depth0))
	    + "\" data-val=\"value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"63":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "            <span class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"loader\"></span>\n";
	},"65":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"error\">"
	    + ((stack1 = alias1((depth0 != null ? depth0.errMsg : depth0), depth0)) != null ? stack1 : "")
	    + "</span>\n            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertWarningPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"warnings\">"
	    + ((stack1 = alias1((depth0 != null ? depth0.warningMsg : depth0), depth0)) != null ? stack1 : "")
	    + "</span>\n";
	},"67":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "            "
	    + ((stack1 = container.lambda(((stack1 = (data && data.root)) && stack1.valueListSeperator), depth0)) != null ? stack1 : "")
	    + "\n";
	},"69":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return "    <div class=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.fieldWrapperClass : depth0), depth0))
	    + "\" uif-fbtype=\"wrapper\" "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(70, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n\n    <input uif-fbtype=\"element\" "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"if","hash":{},"fn":container.program(72, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.disabled : depth0),{"name":"if","hash":{},"fn":container.program(74, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.readOnly : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.hidden),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.placeholder : depth0),{"name":"if","hash":{},"fn":container.program(76, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.min : depth0),{"name":"if","hash":{},"fn":container.program(78, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.max : depth0),{"name":"if","hash":{},"fn":container.program(80, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.step : depth0),{"name":"if","hash":{},"fn":container.program(82, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.value : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.autofocus : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.autocomplete : depth0),{"name":"if","hash":{},"fn":container.program(84, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.maxlength : depth0),{"name":"if","hash":{},"fn":container.program(86, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.name : depth0),{"name":"if","hash":{},"fn":container.program(88, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["class"] : depth0),{"name":"if","hash":{},"fn":container.program(90, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(92, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.uqid : depth0),{"name":"if","hash":{},"fn":container.program(94, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.formnovalidate : depth0),{"name":"if","hash":{},"fn":container.program(96, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.customURL : depth0),{"name":"if","hash":{},"fn":container.program(41, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.validationOnclick : depth0),{"name":"if","hash":{},"fn":container.program(43, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.customAttr : depth0),{"name":"each","hash":{},"fn":container.program(47, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "/>\n\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.qualifier : depth0),{"name":"if","hash":{},"fn":container.program(98, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.multipleEntries : depth0),{"name":"if","hash":{},"fn":container.program(102, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholder),{"name":"if","hash":{},"fn":container.program(104, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.insertErrorPlaceholder),{"name":"if","hash":{},"fn":container.program(106, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n    </div>\n";
	},"70":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " uif-uqid=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "\"";
	},"72":function(container,depth0,helpers,partials,data) {
	    return "type=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.type : depth0), depth0))
	    + "\" ";
	},"74":function(container,depth0,helpers,partials,data) {
	    return " disabled=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.disabled : depth0), depth0))
	    + "\"";
	},"76":function(container,depth0,helpers,partials,data) {
	    return " placeholder=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.placeholder : depth0), depth0))
	    + "\"";
	},"78":function(container,depth0,helpers,partials,data) {
	    return " min=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.min : depth0), depth0))
	    + "\"";
	},"80":function(container,depth0,helpers,partials,data) {
	    return " max=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.max : depth0), depth0))
	    + "\"";
	},"82":function(container,depth0,helpers,partials,data) {
	    return " step=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.step : depth0), depth0))
	    + "\"";
	},"84":function(container,depth0,helpers,partials,data) {
	    return " autocomplete=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.autocomplete : depth0), depth0))
	    + "\"";
	},"86":function(container,depth0,helpers,partials,data) {
	    return " maxlength=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.maxlength : depth0), depth0))
	    + "\"";
	},"88":function(container,depth0,helpers,partials,data) {
	    return " name=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
	    + "\"";
	},"90":function(container,depth0,helpers,partials,data) {
	    return " class=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0["class"] : depth0), depth0))
	    + "\"";
	},"92":function(container,depth0,helpers,partials,data) {
	    return " id=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
	    + "\"";
	},"94":function(container,depth0,helpers,partials,data) {
	    return " uif-uqid=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.uqid : depth0), depth0))
	    + "\"";
	},"96":function(container,depth0,helpers,partials,data) {
	    return " formnovalidate=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.formnovalidate : depth0), depth0))
	    + "\"";
	},"98":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"if","hash":{},"fn":container.program(99, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"99":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "        <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSeparatorClass), depth0))
	    + "\"></span>\n        <select uif-fbtype=\"qualifier\" class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSelectClass), depth0))
	    + "\" "
	    + ((stack1 = helpers.each.call(alias3,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(47, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"each","hash":{},"fn":container.program(100, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "        </select>\n";
	},"100":function(container,depth0,helpers,partials,data) {
	    var alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <option value=\""
	    + alias2(alias1(depth0, depth0))
	    + "\">"
	    + alias2(alias1(depth0, depth0))
	    + "</option>\n";
	},"102":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "        <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputSeparatorClass), depth0))
	    + "\"></span>\n        <input type=\"button\" class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"104":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "        <span class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"loader\"></span>\n";
	},"106":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "        <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"error\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.errMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n        <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertWarningPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"warnings\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.warningMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.valueList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(69, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
	},"useData":true,"useDepths":true});

/***/ },

/***/ 116:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (v1, operator, v2, options) {
	    if (arguments.length < 4) {
	        throw new Error("check needs 2 parameters");
	    }
	
	    switch (operator) {
	        case '==':
	            return v1 == v2 ? options.fn(this) : options.inverse(this);
	        case '===':
	            return v1 === v2 ? options.fn(this) : options.inverse(this);
	        case '!=':
	            return v1 != v2 ? options.fn(this) : options.inverse(this);
	        case '!==':
	            return v1 !== v2 ? options.fn(this) : options.inverse(this);
	        case '<':
	            return v1 < v2 ? options.fn(this) : options.inverse(this);
	        case '<=':
	            return v1 <= v2 ? options.fn(this) : options.inverse(this);
	        case '>':
	            return v1 > v2 ? options.fn(this) : options.inverse(this);
	        case '>=':
	            return v1 >= v2 ? options.fn(this) : options.inverse(this);
	        case '&&':
	            return v1 && v2 ? options.fn(this) : options.inverse(this);
	        case '||':
	            return v1 || v2 ? options.fn(this) : options.inverse(this);
	        default:
	            return options.inverse(this);
	    }
	};
	
	;

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(69);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.valueList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "      "
	    + alias2(alias1((depth0 != null ? depth0.fieldWrapperClass : depth0), depth0))
	    + "\n        <div class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.fieldWrapperClass), depth0))
	    + "\" uif-fbtype=\"wrapper\" "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n\n            <select uif-fbtype=\"element\" "
	    + ((stack1 = helpers.each.call(alias3,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1["class"]),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.name),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.id),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = (data && data.root)) && stack1.options),{"name":"each","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "            </select>\n\n"
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.qualifier),{"name":"if","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n\n\n"
	    + ((stack1 = helpers["if"].call(alias3,(data && data.first),{"name":"if","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.program(31, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias3,(data && data.last),{"name":"if","hash":{},"fn":container.program(34, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n\n"
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholder),{"name":"if","hash":{},"fn":container.program(37, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.insertErrorPlaceholder),{"name":"if","hash":{},"fn":container.program(39, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,(data && data.index),"!==",((stack1 = (data && data.root)) && stack1.valueListLengthOBase),{"name":"check","hash":{},"fn":container.program(41, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "        </div>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "\n             uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"5":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda;
	
	  return container.escapeExpression(alias1((data && data.key), depth0))
	    + "=\""
	    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
	    + "\"";
	},"7":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return " "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.readOnly),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                    uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"8":function(container,depth0,helpers,partials,data) {
	    return "  readOnly";
	},"10":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "\n              "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1["class"]), depth0))
	    + "\"";
	},"11":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " disabled=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.disabled), depth0))
	    + "\"";
	},"13":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " name=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.name), depth0))
	    + "\"";
	},"15":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " id=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.id), depth0))
	    + "\"";
	},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                  <option value=\""
	    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
	    + "\"\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,helpers.lookup.call(alias3,depths[1],"value",{"name":"lookup","hash":{},"data":data}),"===",(depth0 != null ? depth0.value : depth0),{"name":"check","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,helpers.lookup.call(alias3,depths[1],"value",{"name":"lookup","hash":{},"data":data}),"===",(depth0 != null ? depth0.label : depth0),{"name":"check","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "                          >"
	    + alias2(alias1((depth0 != null ? depth0.label : depth0), depth0))
	    + "</option>\n";
	},"18":function(container,depth0,helpers,partials,data) {
	    return "                          selected\n";
	},"20":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"21":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSeparatorClass), depth0))
	    + "\"></span>\n                <select uif-fbtype=\"qualifier\" "
	    + ((stack1 = helpers.each.call(alias3,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                  "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSelectClass), depth0))
	    + "\">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"each","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "                </select>\n";
	},"22":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return " uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"24":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                      <option value=\""
	    + alias2(alias1(depth0, depth0))
	    + "\"\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,helpers.lookup.call(alias3,depths[1],"qualifier",{"name":"lookup","hash":{},"data":data}),"===",depth0,{"name":"check","hash":{},"fn":container.program(25, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">"
	    + alias2(alias1(depth0, depth0))
	    + "</option>\n";
	},"25":function(container,depth0,helpers,partials,data) {
	    return "                              selected\n                        ";
	},"27":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = __default(__webpack_require__(116)).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.valueList)) && stack1.length),">",1,{"name":"check","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"28":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showRemoveField),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"29":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                  <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldSeparatorClass), depth0))
	    + "\"></span>\n                  <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                         class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldValue), depth0))
	    + "\">\n";
	},"31":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showRemoveField),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"32":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldSeparatorClass), depth0))
	    + "\"></span>\n                <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                       class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldValue), depth0))
	    + "\">\n";
	},"34":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showAddInputField),{"name":"if","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"35":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputSeparatorClass), depth0))
	    + "\"></span>\n                <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                       class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"37":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "              <span class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"loader\"></span>\n";
	},"39":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"error\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.errMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertWarningPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"warnings\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.warningMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n";
	},"41":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "            "
	    + ((stack1 = container.lambda(((stack1 = (data && data.root)) && stack1.valueListSeperator), depth0)) != null ? stack1 : "")
	    + "\n";
	},"43":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return "      <div class=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.fieldWrapperClass : depth0), depth0))
	    + "\" uif-fbtype=\"wrapper\" "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(44, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n\n          <select uif-fbtype=\"element\" "
	    + ((stack1 = helpers.each.call(alias1,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.readOnly),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.name),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.id),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(44, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1["class"]),{"name":"if","hash":{},"fn":container.program(46, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n"
	    + ((stack1 = helpers.each.call(alias1,((stack1 = (data && data.root)) && stack1.options),{"name":"each","hash":{},"fn":container.program(48, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "          </select>\n\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.qualifier : depth0),{"name":"if","hash":{},"fn":container.program(51, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.multipleEntries : depth0),{"name":"if","hash":{},"fn":container.program(55, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholder),{"name":"if","hash":{},"fn":container.program(57, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.insertErrorPlaceholder),{"name":"if","hash":{},"fn":container.program(59, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n      </div>\n";
	},"44":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " uif-uqid=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "\"";
	},"46":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                  class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1["class"]), depth0))
	    + "\"";
	},"48":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                <option value=\""
	    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
	    + "\"\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,helpers.lookup.call(alias3,depths[1],"value",{"name":"lookup","hash":{},"data":data}),"===",(depth0 != null ? depth0.value : depth0),{"name":"check","hash":{},"fn":container.program(49, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,helpers.lookup.call(alias3,depths[1],"value",{"name":"lookup","hash":{},"data":data}),"===",(depth0 != null ? depth0.label : depth0),{"name":"check","hash":{},"fn":container.program(49, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "                        >"
	    + alias2(alias1((depth0 != null ? depth0.label : depth0), depth0))
	    + "</option>\n";
	},"49":function(container,depth0,helpers,partials,data) {
	    return "                        selected\n";
	},"51":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"if","hash":{},"fn":container.program(52, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"52":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSeparatorClass), depth0))
	    + "\"></span>\n              <select uif-fbtype=\"qualifier\" "
	    + ((stack1 = helpers.each.call(alias3,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSelectClass), depth0))
	    + "\">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"each","hash":{},"fn":container.program(53, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "              </select>\n";
	},"53":function(container,depth0,helpers,partials,data) {
	    var alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                    <option value=\""
	    + alias2(alias1(depth0, depth0))
	    + "\">"
	    + alias2(alias1(depth0, depth0))
	    + "</option>\n";
	},"55":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputSeparatorClass), depth0))
	    + "\"></span>\n            <input type=\"button\" class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"57":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "            <span class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"loader\"></span>\n";
	},"59":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"error\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.errMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertWarningPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"warnings\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.warningMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n";
	},"61":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "      <ol class=\"error-messages\">\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.errors : depth0),{"name":"each","hash":{},"fn":container.program(62, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "      </ol>\n";
	},"62":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return ((stack1 = __default(__webpack_require__(116)).call(alias1,(depth0 != null ? depth0.errorHint : depth0),"===","WARNING",{"name":"check","hash":{},"fn":container.program(63, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = __default(__webpack_require__(116)).call(alias1,(depth0 != null ? depth0.errorHint : depth0),"===","CRITICAL",{"name":"check","hash":{},"fn":container.program(65, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"63":function(container,depth0,helpers,partials,data) {
	    return "              <li class=\"warning-message\">"
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.errorMessage : depth0), depth0))
	    + "</li>\n";
	},"65":function(container,depth0,helpers,partials,data) {
	    return "              <li class=\"error-message\">"
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.errorMessage : depth0), depth0))
	    + "</li>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return "<div>\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.valueList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(43, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.errors : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(61, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n";
	},"useData":true,"useDepths":true});

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(69);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.valueList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=depth0 != null ? depth0 : {};
	
	  return "        <div class=\""
	    + container.escapeExpression(alias1(((stack1 = (data && data.root)) && stack1.fieldWrapperClass), depth0))
	    + "\" uif-fbtype=\"wrapper\" "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n\n            <textarea uif-fbtype=\"element\" "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1["class"]),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.rows),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.cols),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers.each.call(alias2,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">"
	    + ((stack1 = alias1((depth0 != null ? depth0.value : depth0), depth0)) != null ? stack1 : "")
	    + "</textarea>\n\n"
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.qualifier),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias2,(data && data.first),{"name":"if","hash":{},"fn":container.program(25, data, 0, blockParams, depths),"inverse":container.program(29, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias2,(data && data.last),{"name":"if","hash":{},"fn":container.program(32, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholder),{"name":"if","hash":{},"fn":container.program(35, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.insertErrorPlaceholder),{"name":"if","hash":{},"fn":container.program(37, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias2,(data && data.index),"!==",((stack1 = (data && data.root)) && stack1.valueListLengthOBase),{"name":"check","hash":{},"fn":container.program(39, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "        </div>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "\n             uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"5":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.readOnly),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1["class"]), depth0))
	    + "\"";
	},"6":function(container,depth0,helpers,partials,data) {
	    return "  readOnly";
	},"8":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "\n                      uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"10":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "\n                      rows=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.rows), depth0))
	    + "\"";
	},"12":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "\n                      cols=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.cols), depth0))
	    + "\"";
	},"14":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda;
	
	  return container.escapeExpression(alias1((data && data.key), depth0))
	    + "=\""
	    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
	    + "\"";
	},"16":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"if","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSeparatorClass), depth0))
	    + "\"></span>\n                <select uif-fbtype=\"qualifier\" "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                        class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSelectClass), depth0))
	    + "\" "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"each","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "                </select>\n";
	},"18":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return " uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"20":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " disabled=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.disabled), depth0))
	    + "\"";
	},"22":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                      <option value=\""
	    + alias2(alias1(depth0, depth0))
	    + "\"\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,helpers.lookup.call(alias3,depths[1],"qualifier",{"name":"lookup","hash":{},"data":data}),"===",depth0,{"name":"check","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">"
	    + alias2(alias1(depth0, depth0))
	    + "</option>\n";
	},"23":function(container,depth0,helpers,partials,data) {
	    return "                              selected\n                        ";
	},"25":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = __default(__webpack_require__(116)).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.valueList)) && stack1.length),">",1,{"name":"check","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"26":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showRemoveField),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"27":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                  <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldSeparatorClass), depth0))
	    + "\"></span>\n                  <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                         class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldValue), depth0))
	    + "\">\n";
	},"29":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showRemoveField),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"30":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldSeparatorClass), depth0))
	    + "\"></span>\n                <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                       class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldValue), depth0))
	    + "\">\n";
	},"32":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showAddInputField),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"33":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputSeparatorClass), depth0))
	    + "\"></span>\n                <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                       class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"35":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "              <span class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"loader\"></span>\n";
	},"37":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"error\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.errMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertWarningPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"warnings\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.warningMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n";
	},"39":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "            "
	    + ((stack1 = container.lambda(((stack1 = (data && data.root)) && stack1.valueListSeperator), depth0)) != null ? stack1 : "")
	    + "\n";
	},"41":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=depth0 != null ? depth0 : {};
	
	  return "      <div class=\""
	    + container.escapeExpression(alias1((depth0 != null ? depth0.fieldWrapperClass : depth0), depth0))
	    + "\" uif-fbtype=\"wrapper\" "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n\n          <textarea uif-fbtype=\"element\""
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.readOnly),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1["class"]),{"name":"if","hash":{},"fn":container.program(44, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(46, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.rows),{"name":"if","hash":{},"fn":container.program(48, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.cols),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers.each.call(alias2,((stack1 = (data && data.root)) && stack1.customAttr),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.value), depth0)) != null ? stack1 : "")
	    + "</textarea>\n\n"
	    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.qualifier : depth0),{"name":"if","hash":{},"fn":container.program(52, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.multipleEntries : depth0),{"name":"if","hash":{},"fn":container.program(56, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholder),{"name":"if","hash":{},"fn":container.program(58, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias2,((stack1 = (data && data.root)) && stack1.insertErrorPlaceholder),{"name":"if","hash":{},"fn":container.program(60, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n      </div>\n";
	},"42":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " uif-uqid=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "\"";
	},"44":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1["class"]), depth0))
	    + "\"";
	},"46":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "\n                    uif-uqid=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "\"";
	},"48":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " rows=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.rows), depth0))
	    + "\"";
	},"50":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "\n                    cols=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.cols), depth0))
	    + "\"";
	},"52":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"if","hash":{},"fn":container.program(53, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"53":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSeparatorClass), depth0))
	    + "\"></span>\n              <select uif-fbtype=\"qualifier\" class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSelectClass), depth0))
	    + "\" "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"each","hash":{},"fn":container.program(54, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "              </select>\n";
	},"54":function(container,depth0,helpers,partials,data) {
	    var alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                    <option value=\""
	    + alias2(alias1(depth0, depth0))
	    + "\">"
	    + alias2(alias1(depth0, depth0))
	    + "</option>\n";
	},"56":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputSeparatorClass), depth0))
	    + "\"></span>\n            <input type=\"button\" class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"58":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "            <span class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"loader\"></span>\n";
	},"60":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"error\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.errMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertWarningPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"warnings\">"
	    + ((stack1 = alias1(((stack1 = (data && data.root)) && stack1.warningMsg), depth0)) != null ? stack1 : "")
	    + "</span>\n";
	},"62":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "      <ol class=\"error-messages\">\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.errors : depth0),{"name":"each","hash":{},"fn":container.program(63, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "      </ol>\n";
	},"63":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return ((stack1 = __default(__webpack_require__(116)).call(alias1,(depth0 != null ? depth0.errorHint : depth0),"===","WARNING",{"name":"check","hash":{},"fn":container.program(64, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = __default(__webpack_require__(116)).call(alias1,(depth0 != null ? depth0.errorHint : depth0),"===","CRITICAL",{"name":"check","hash":{},"fn":container.program(66, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"64":function(container,depth0,helpers,partials,data) {
	    return "              <li class=\"warning-message\">"
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.errorMessage : depth0), depth0))
	    + "</li>\n";
	},"66":function(container,depth0,helpers,partials,data) {
	    return "              <li class=\"error-message\">"
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.errorMessage : depth0), depth0))
	    + "</li>\n";
	},"68":function(container,depth0,helpers,partials,data) {
	    var alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "        <span class=\""
	    + alias2(alias1((depth0 != null ? depth0.descriptionClass : depth0), depth0))
	    + "\">"
	    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
	    + "</span>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return "<div>\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.valueList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(41, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.errors : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(62, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(68, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>";
	},"useData":true,"useDepths":true});

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(69);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.valueList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "        <div class=\""
	    + alias2(alias1((depth0 != null ? depth0.fieldWrapperClass : depth0), depth0))
	    + "\" uif-fbtype=\"wrapper\" "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n\n            <div class=\"custom-ele-holder "
	    + alias2(alias1((depth0 != null ? depth0.moduleContainerClass : depth0), depth0))
	    + "\"></div>\n\n"
	    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.qualifier),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias3,(data && data.first),{"name":"if","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.program(26, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholder),{"name":"if","hash":{},"fn":container.program(29, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.insertErrorPlaceholder),{"name":"if","hash":{},"fn":container.program(31, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,(data && data.index),"!==",((stack1 = (data && data.root)) && stack1.valueListLengthOBase),{"name":"check","hash":{},"fn":container.program(33, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n        </div>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "\n             uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"5":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "              <label "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">"
	    + ((stack1 = container.lambda((depth0 != null ? depth0.label : depth0), depth0)) != null ? stack1 : "")
	    + "</label>\n";
	},"6":function(container,depth0,helpers,partials,data) {
	    return "for=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
	    + "\"";
	},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSeparatorClass), depth0))
	    + "\"></span>\n                <select "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.name),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.id),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "uif-fbtype=\"qualifier\" "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                                               class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSelectClass), depth0))
	    + "\">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"each","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "                </select>\n";
	},"10":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " name=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.name), depth0))
	    + "\"";
	},"12":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " name=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.id), depth0))
	    + "\"";
	},"14":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " disabled=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.disabled), depth0))
	    + "\"";
	},"16":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "\n                                               disabled=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.disabled), depth0))
	    + "\"";
	},"18":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "\n                                               uif-uqid=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "--"
	    + alias2(alias1((data && data.index), depth0))
	    + "\"";
	},"20":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "                      <option value=\""
	    + alias2(alias1(depth0, depth0))
	    + "\"\n"
	    + ((stack1 = __default(__webpack_require__(116)).call(alias3,helpers.lookup.call(alias3,depths[1],"qualifier",{"name":"lookup","hash":{},"data":data}),"===",depth0,{"name":"check","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">"
	    + alias2(alias1(depth0, depth0))
	    + "</option>\n";
	},"21":function(container,depth0,helpers,partials,data) {
	    return "                              selected\n                        ";
	},"23":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.showAddInputField),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"24":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputSeparatorClass), depth0))
	    + "\"></span>\n                <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                       class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"26":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.showRemoveField),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.showAddInputField),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"27":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldSeparatorClass), depth0))
	    + "\"></span>\n                <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                       class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.removeFieldValue), depth0))
	    + "\">\n";
	},"29":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "              <span class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"loader\"></span>\n";
	},"31":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"error\"></span>\n              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"warnings\"></span>\n";
	},"33":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "            "
	    + ((stack1 = container.lambda(((stack1 = (data && data.root)) && stack1.valueListSeperator), depth0)) != null ? stack1 : "")
	    + "\n";
	},"35":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "      <div class=\""
	    + alias2(alias1((depth0 != null ? depth0.fieldWrapperClass : depth0), depth0))
	    + " "
	    + alias2(alias1((depth0 != null ? depth0.moduleContainerClass : depth0), depth0))
	    + "\" uif-fbtype=\"wrapper\" "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.uqid),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n\n          <div class=\"custom-ele-holder "
	    + alias2(alias1((depth0 != null ? depth0.moduleContainerClass : depth0), depth0))
	    + "\"></div>\n\n"
	    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.qualifier : depth0),{"name":"if","hash":{},"fn":container.program(38, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.multipleEntries : depth0),{"name":"if","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholder),{"name":"if","hash":{},"fn":container.program(44, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.insertErrorPlaceholder),{"name":"if","hash":{},"fn":container.program(46, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n      </div>\n";
	},"36":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return " uif-uqid=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.uqid), depth0))
	    + "\"";
	},"38":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"if","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"39":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};
	
	  return "              <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSeparatorClass), depth0))
	    + "\"></span>\n              <select "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.name),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.id),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + " uif-fbtype=\"qualifier\"\n                                             class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.qualifierSelectClass), depth0))
	    + "\">\n"
	    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (data && data.root)) && stack1.qualifier)) && stack1.allowedValues),{"name":"each","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "              </select>\n";
	},"40":function(container,depth0,helpers,partials,data) {
	    var alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                    <option value=\""
	    + alias2(alias1(depth0, depth0))
	    + "\">"
	    + alias2(alias1(depth0, depth0))
	    + "</option>\n";
	},"42":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputSeparatorClass), depth0))
	    + "\"></span>\n            <input type=\"button\" "
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.disabled),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n                   class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputClass), depth0))
	    + "\" value=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.addNewInputValue), depth0))
	    + "\">\n";
	},"44":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "            <span class=\""
	    + container.escapeExpression(container.lambda(((stack1 = (data && data.root)) && stack1.insertLoaderPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"loader\"></span>\n";
	},"46":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"error\"></span>\n            <span class=\""
	    + alias2(alias1(((stack1 = (data && data.root)) && stack1.insertErrorPlaceholderClass), depth0))
	    + "\" uif-fbtype=\"warnings\"></span>\n";
	},"48":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "      <ol class=\"error-messages\">\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.errors : depth0),{"name":"each","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "      </ol>\n";
	},"49":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return ((stack1 = __default(__webpack_require__(116)).call(alias1,(depth0 != null ? depth0.errorHint : depth0),"===","WARNING",{"name":"check","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = __default(__webpack_require__(116)).call(alias1,(depth0 != null ? depth0.errorHint : depth0),"===","CRITICAL",{"name":"check","hash":{},"fn":container.program(52, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"50":function(container,depth0,helpers,partials,data) {
	    return "              <li class=\"warning-message\">"
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.errorMessage : depth0), depth0))
	    + "</li>\n";
	},"52":function(container,depth0,helpers,partials,data) {
	    return "              <li class=\"error-message\">"
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.errorMessage : depth0), depth0))
	    + "</li>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return "<div>\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.valueList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(35, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.errors : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(48, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n";
	},"useData":true,"useDepths":true});

/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _core = __webpack_require__(2);
	
	var _core2 = _interopRequireDefault(_core);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    createInstance: function createInstance(moduleName, instanceConfig, parentInstanceId) {
	        return _core2.default.createInstance(moduleName, instanceConfig, parentInstanceId);
	    },
	    loadModule: function loadModule(moduleName) {
	        return _core2.default.loadModule(moduleName);
	    },
	    destroyInstance: function destroyInstance(moduleInstanceId) {
	        _core2.default.destroyModuleInstance(moduleInstanceId);
	    }
	};

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _meta = __webpack_require__(122);
	
	var _meta2 = _interopRequireDefault(_meta);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    meta: _meta2.default
	};

/***/ },

/***/ 122:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = todos;
	var initialState = {};
	
	function todos() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments[1];
	
	
	    return state;
	}

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(124);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(94)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./default.less", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./default.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(93)();
	// imports
	
	
	// module
	exports.push([module.id, ".form-horizontal h4 {\n  text-align: center;\n  font-weight: lighter;\n  font-size: 27px;\n  padding-top: 25px;\n}\n.form-horizontal p {\n  text-align: center;\n}\n.form-horizontal .help-inline.error {\n  margin-left: 33%;\n  font-size: 12px;\n  color: red;\n}\n.form-horizontal .form-group .control-label {\n  display: inline-block;\n  width: 26%;\n  text-align: right;\n  padding: 2%;\n}\n.form-horizontal .form-group .controls {\n  display: inline-block;\n  width: 60%;\n  text-align: left;\n  padding: 2%;\n}\n.form-horizontal .form-group input,\n.form-horizontal .form-group select,\n.form-horizontal .form-group textarea {\n  width: 90%;\n  height: 20px;\n  border: 1px solid #f5f5f5;\n  padding: 5px;\n}\n.form-horizontal .form-group input[type=\"button\"] {\n  height: 30px;\n  background-color: #1b151d;\n  color: white;\n  font-size: 14px;\n}\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=1.form-4f6628052ca081a8b5ca.js.map