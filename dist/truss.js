(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Truss"] = factory();
	else
		root["Truss"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PubSub = exports.Truss = undefined;

	var _core = __webpack_require__(1);

	var _core2 = _interopRequireDefault(_core);

	var _pubsub = __webpack_require__(2);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Truss = _core2.default;
	exports.PubSub = _pubsub2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _es6Promise = __webpack_require__(5);

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	var _base = __webpack_require__(4);

	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 * @class CoreConstructor
	 * @classdesc Creates a core instance
	 */
	function CoreConstructor(appConfig) {
	    var modules = {},
	        subscriptions = {},
	        uniqueIdsTill = -1,
	        allModuleInstances = {};

	    function getNextUniqueId() {
	        uniqueIdsTill++;
	        return 'UIF-' + uniqueIdsTill;
	    }

	    function getModuleInstance(core, moduleName, ModuleBase, config, parentInstanceId) {
	        //moduleName, uniqueId, instanceConfig, parentInstanceId
	        var moduleInstance,
	            moduleBasicExtension,
	            baseModuleInstance,
	            module = modules[moduleName],
	            listensTo = config.instanceConfig.listensTo,
	            moduleInstanceId;

	        //Create the module
	        baseModuleInstance = new ModuleBase({
	            parentInstanceId: parentInstanceId,
	            moduleName: moduleName,
	            instanceConfig: config.instanceConfig,
	            uniqueId: getNextUniqueId(),
	            parentCssSelector: parentInstanceId ? allModuleInstances[parentInstanceId].moduleInstance.getCssSelector() : undefined
	        });

	        moduleInstance = core.extend(baseModuleInstance, module.properties);
	        moduleInstanceId = moduleInstance.getUniqueId();

	        //Add module to the list of composite modules of parent
	        if (parentInstanceId) {
	            allModuleInstances[parentInstanceId].modules.push(moduleInstanceId);
	        } else {
	            // console.warn("WARNING! parentInstanceId is missing for module " + moduleInstance.getModuleName() + "with id: " + moduleInstanceId);
	        }

	        allModuleInstances[moduleInstanceId] = {
	            moduleInstance: moduleInstance,
	            parentInstanceId: parentInstanceId,
	            modules: []
	        };

	        //Create Arena for module
	        moduleInstance.createPlayArena();
	        moduleInstance.setup();

	        //Setup event listeners for this module instance
	        listensTo && listensTo.forEach(function (listener) {
	            moduleInstance.subscribe({
	                eventName: listener.eventName,
	                callback: moduleInstance[listener.callback],
	                context: moduleInstance,
	                eventPublisher: listener.eventPublisher,
	                once: listener.once
	            });
	        });

	        return moduleInstance;
	    }

	    function stopModuleInstantiation(code) {
	        return new _es6Promise.Promise(function (resolve, reject) {
	            reject(code);
	        });
	    }

	    return {
	        //Plugins
	        plugins: {},
	        register: function register(moduleName, properties) {
	            if (!modules[moduleName]) {
	                modules[moduleName] = {
	                    properties: properties
	                };
	            } else {
	                //Throw error using error framework
	            }
	        },
	        createInstance: function createInstance(moduleObj, instanceConfig, parentInstanceId) {
	            var moduleName = moduleObj.moduleName,
	                module = modules[moduleName],
	                self = this,
	                createInstancePromise,
	                moduleInstance,
	                config,
	                moduleInstanceId;

	            createInstancePromise = new _es6Promise.Promise(function (resolve, reject) {
	                if (module && module.properties) {
	                    // Load the module config
	                    //modules[moduleName]["config"] = config = module.properties.config;

	                    if (parentInstanceId && !allModuleInstances[parentInstanceId]) {
	                        return stopModuleInstantiation("CONFIG_FETCHED");
	                    }

	                    // Create module instance
	                    moduleInstance = getModuleInstance(self, moduleName, _base2.default, {
	                        instanceConfig: instanceConfig
	                    }, parentInstanceId);

	                    moduleInstanceId = moduleInstance.getUniqueId();

	                    var promise = new _es6Promise.Promise(function (resolve) {
	                        var initOn;
	                        if (instanceConfig.initOn) {
	                            initOn = instanceConfig.initOn;
	                            moduleInstance.subscribe({
	                                eventName: initOn.eventName,
	                                callback: function callback(data) {
	                                    resolve(data);
	                                },
	                                context: moduleInstance,
	                                eventPublisher: initOn.eventPublisher,
	                                once: true
	                            });

	                            //Module instance is created and subscribed to events
	                            moduleInstance.publish(moduleInstance.getModuleName() + '_CREATED', {
	                                moduleInstanceId: moduleInstanceId
	                            });
	                        } else {
	                            //Module instance is created and subscribed to events
	                            moduleInstance.publish(moduleInstance.getModuleName() + '_CREATED', {
	                                moduleInstanceId: moduleInstanceId
	                            });

	                            resolve();
	                        }
	                    });

	                    promise.then(function (data) {
	                        if (parentInstanceId && !allModuleInstances[parentInstanceId]) {
	                            return stopModuleInstantiation("SUBSCRIBED");
	                        }

	                        function publishModuleReady() {
	                            //Module is fully loaded now and can be used now
	                            moduleInstance.publish(moduleInstance.getModuleName() + '_READY', {
	                                moduleInstanceId: moduleInstanceId
	                            });
	                        }

	                        return moduleInstance.init(data).then(function () {
	                            publishModuleReady();

	                            // console.debug("Instantiation Successful:", moduleInstance.getModuleName(), "-", moduleInstance.getUniqueId());
	                            return true;
	                        }, function () {
	                            publishModuleReady();

	                            // console.error("Instantiation Failure:", moduleInstance.getModuleName(), "-", moduleInstance.getUniqueId(), '-', moduleInstance.getCssSelector());
	                            return true;
	                        });
	                    }).then(function () {
	                        return new _es6Promise.Promise(function (resolve, reject) {
	                            if (module.properties.config && typeof module.properties.config.then === "function") {
	                                module.properties.config.then(function (fetchedConfig) {
	                                    modules[moduleName]["config"] = fetchedConfig;
	                                    resolve(fetchedConfig);
	                                }, function (err) {
	                                    reject(err);
	                                });
	                            } else if (module.properties.config) {
	                                modules[moduleName]["config"] = module.properties.config;
	                                resolve(module.properties.config);
	                            } else {
	                                modules[moduleName]["config"] = {};
	                                resolve({});
	                            }
	                        });
	                    }).then(function (config) {
	                        //If module is composite, start inner modules
	                        if (config.modules) {
	                            self.loadModule(config.modules);
	                            var compositeModulePromises = [];

	                            config.modules.forEach(function (module) {

	                                var instanceConfigFromParent = instanceConfig && instanceConfig.modules && instanceConfig.modules.filter(function (m) {
	                                    return m.moduleName === module.moduleName && m.instanceConfig.container === module.instanceConfig.container;
	                                })[0],
	                                    subModuleInstanceConfig = module.instanceConfig;

	                                if (instanceConfigFromParent && instanceConfigFromParent.instanceConfig) {
	                                    subModuleInstanceConfig.placeholders = instanceConfigFromParent.instanceConfig.placeholders || instanceConfig.placeholders;
	                                    subModuleInstanceConfig.listensTo = instanceConfigFromParent.instanceConfig.listensTo || instanceConfig.listensTo;
	                                    subModuleInstanceConfig.autorender = instanceConfigFromParent.instanceConfig.autorender === false ? false : instanceConfig.autorender;
	                                }

	                                var promise = self.createInstance(module, subModuleInstanceConfig, moduleInstanceId);
	                                compositeModulePromises.push(promise);
	                            });

	                            _es6Promise.Promise.all(compositeModulePromises).then(function () {
	                                if (parentInstanceId && !allModuleInstances[parentInstanceId]) {
	                                    self.destroyModuleInstance(moduleInstanceId);
	                                    reject("Module instantiation for " + moduleName + " failed because parent with id " + parentInstanceId + " is already distroyed.");
	                                }
	                                resolve(moduleInstanceId);
	                            }, function () {
	                                // TODO: Fix this
	                                if (parentInstanceId && !allModuleInstances[parentInstanceId]) {
	                                    self.destroyModuleInstance(moduleInstanceId);
	                                    reject("Module instantiation for " + moduleName + " failed because parent with id " + parentInstanceId + " is already distroyed.");
	                                }
	                                resolve(moduleInstanceId);
	                            });
	                        } else {
	                            if (parentInstanceId && !allModuleInstances[parentInstanceId]) {
	                                self.destroyModuleInstance(moduleInstanceId);
	                                reject("Module instantiation for " + moduleName + " failed because parent with id " + parentInstanceId + " is already distroyed.");
	                            }
	                            resolve(moduleInstanceId);
	                        }
	                    }, function (code) {
	                        //Handle the case when the module instantiation was started but then stopped in-between

	                        switch (code) {
	                            case "SUBSCRIBED":
	                                // console.log("Module instantiation for " + moduleName + " failed because parent with id " + parentInstanceId + " is already distroyed.");
	                                self.destroyModuleInstance(moduleInstanceId);
	                                break;
	                        }
	                    }).catch(function (error) {
	                        // console.error(error);
	                        // console.error("Error loading module", moduleName, error.message);
	                    });
	                } else {
	                        //Throw error using error framework
	                    }
	            });

	            return createInstancePromise;
	        },
	        destroyModuleInstance: function destroyModuleInstance(moduleInstanceId) {
	            var instanceDetails = allModuleInstances[moduleInstanceId],
	                parentInstanceId = instanceDetails.parentInstanceId,
	                parentInstance = parentInstanceId ? allModuleInstances[parentInstanceId] : undefined,
	                self = this,
	                moduleInstance,
	                moduleSubscriptions;

	            if (instanceDetails) {
	                moduleInstance = instanceDetails.moduleInstance;

	                if (instanceDetails.modules) {
	                    instanceDetails.modules.forEach(function (instanceId) {
	                        self.destroyModuleInstance(instanceId);
	                    });
	                }

	                //Remove module subscriptions
	                moduleSubscriptions = moduleInstance.getAllSubscriptions();
	                moduleSubscriptions.forEach(function (subscription) {
	                    moduleInstance.unsubscribe(subscription.eventName, subscription.callback);
	                });

	                //Destroy the module
	                moduleInstance.destroy();

	                //Destroy arena for this module
	                moduleInstance.destroyPlayArena(parentInstanceId);

	                moduleInstance.isDestroyed = true;
	                if (parentInstance) {
	                    parentInstance.modules = parentInstance.modules.filter(function (id) {
	                        return id !== moduleInstanceId;
	                    });
	                }
	                delete allModuleInstances[moduleInstanceId];
	                // console.log("Destroyed:", moduleInstance.getModuleName(), "-", moduleInstance.getUniqueId());
	            }
	        },
	        loadModule: function loadModule(moduleArr) {
	            var self = this,
	                moduleList,
	                modularDependencies;

	            if (!Array.isArray(moduleArr)) {
	                modularDependencies = [moduleArr];
	            } else {
	                modularDependencies = moduleArr;
	            }

	            modularDependencies.forEach(function (moduleObj) {
	                var moduleName = moduleObj.moduleName;
	                if (!modules[moduleName]) {
	                    if (moduleObj.instance) {
	                        self.register(moduleName, moduleObj.instance);
	                    } else {
	                        logit.error("No module with name " + moduleName);
	                    }
	                }
	            });
	        },
	        loadApp: function loadApp(appConfig) {
	            this.publish('CORE', 'APP_LOADED', appConfig);
	        },
	        subscribe: function subscribe(subscription) {
	            var eventName = subscription.eventName;

	            if (!subscriptions[eventName]) {
	                subscriptions[eventName] = [];
	            }

	            subscriptions[eventName].push(_utils2.default.pick(subscription, ['callback', 'eventSubscriber', 'context', 'eventPublisher', 'once']));
	            // console.debug("Event subscribed:", eventName, subscription);
	        },
	        publish: function publish(publisher, eventName, message) {
	            var subscriptionsForEvent = subscriptions[eventName],
	                remainingSubscriptions = [];

	            // console.debug("Event published:", eventName, {
	            //     eventName: eventName,
	            //     message: message,
	            //     publisher: publisher,
	            //     subscription: subscriptionsForEvent
	            // });

	            if (subscriptionsForEvent && subscriptionsForEvent.length) {
	                subscriptionsForEvent.forEach(function (subscription) {
	                    var callback = subscription.callback,
	                        context = subscription.context,
	                        subscribeOnce = subscription.once;

	                    if (subscription.eventPublisher) {
	                        var regex = new RegExp(subscription.eventPublisher + "$");
	                        if (regex.test(publisher)) {
	                            callback.apply(context ? context : null, [message]);
	                            if (!subscribeOnce) {
	                                remainingSubscriptions.push(subscription);
	                            }
	                        } else {
	                            var actualPublisherHierarchy = publisher.split(' '),
	                                subscriptionPublisherHierarhcy = subscription.eventPublisher.split(' '),
	                                a = actualPublisherHierarchy.length,
	                                b = subscriptionPublisherHierarhcy.length;

	                            while (actualPublisherHierarchy.length && subscriptionPublisherHierarhcy.length) {
	                                a = actualPublisherHierarchy.length;
	                                b = subscriptionPublisherHierarhcy.length;

	                                if (actualPublisherHierarchy[a - 1] === subscriptionPublisherHierarhcy[b - 1]) {
	                                    actualPublisherHierarchy.pop();
	                                    subscriptionPublisherHierarhcy.pop();
	                                } else {
	                                    actualPublisherHierarchy.pop();
	                                }
	                            }

	                            if (!subscriptionPublisherHierarhcy.length) {
	                                // console.debug("Event published. calling..", callback);
	                                callback.apply(context ? context : null, [message]);
	                                if (!subscribeOnce) {
	                                    remainingSubscriptions.push(subscription);
	                                }
	                            } else {
	                                remainingSubscriptions.push(subscription);
	                            }
	                        }
	                    } else {
	                        callback.apply(context ? context : null, [message]);
	                        if (!subscribeOnce) {
	                            remainingSubscriptions.push(subscription);
	                        }
	                    }
	                });
	            }

	            subscriptions[eventName] = remainingSubscriptions;
	        },
	        unsubscribe: function unsubscribe(subscriber, eventName, callback) {
	            var subscriptionsForEvent = subscriptions[eventName];

	            subscriptions[eventName] = subscriptionsForEvent.filter(function (subscription) {
	                return !(subscription.callback === callback && subscription.eventSubscriber === subscriber);
	            });

	            // console.debug("Event unsubscribed:", eventName, subscriptionsForEvent);
	        },
	        logAllModuleInstances: function logAllModuleInstances() {
	            // console.debug(allModuleInstances);
	        },
	        extend: function extend(objToExtend, properties) {
	            function F() {}

	            F.prototype = objToExtend;

	            return Object.assign(new F(), properties);
	        }
	    };
	}

	exports.default = new CoreConstructor();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _core = __webpack_require__(1);

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
/* 3 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _pubsub = __webpack_require__(2);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function ModuleBase(config) {
	    var moduleSubscriptions = [];
	    config = Object.assign({}, config);

	    this.isDestroyed = false;
	    this.modulePlaceholders = config.instanceConfig.placeholders;
	    this.getUniqueId = function () {
	        return config.uniqueId;
	    };
	    this.getParentInstanceId = function () {
	        return config.parentInstanceId;
	    };
	    this.getModuleName = function () {
	        return config.moduleName;
	    };
	    this.getInstanceConfig = function () {
	        return config.instanceConfig;
	    };
	    this.subscribe = function (subscription) {
	        subscription.eventSubscriber = this.getModuleContainer();
	        moduleSubscriptions.push(subscription);
	        _pubsub2.default.subscribe(subscription);
	    };
	    this.unsubscribe = function (eventName, callback) {
	        moduleSubscriptions = moduleSubscriptions.filter(function (subscription) {
	            return subscription.callback !== callback || subscription.eventName !== eventName;
	        });

	        _pubsub2.default.unsubscribe(this.getModuleContainer(), eventName, callback);
	    };
	    this.getAllSubscriptions = function () {
	        return moduleSubscriptions;
	    };

	    this.getArenaContainer = function () {
	        return config.instanceConfig.container;
	    };

	    this.getCssSelector = function () {
	        return config.parentCssSelector ? config.parentCssSelector + ' ' + this.getArenaContainer() : this.getArenaContainer();
	    };
	}

	ModuleBase.prototype = {
	    init: function init() {
	        return this.render();
	    },
	    setup: function setup() {
	        // Nothing to do here
	    },
	    destroy: function destroy() {
	        var containerNode = document.querySelector(this.getModuleContainer());
	        containerNode.innerHTML = "";
	    },
	    createPlayArena: function createPlayArena() {
	        var selector = this.getParentInstanceId() ? '#' + this.getParentInstanceId() + ' ' + this.getArenaContainer() : this.getArenaContainer(),
	            themeClass = this.getInstanceConfig().theme ? this.getModuleName() + '-' + this.getInstanceConfig().theme : this.getModuleName() + '-default';

	        document.querySelector(selector).innerHTML = '<div id="' + this.getUniqueId() + '" class="' + themeClass + ' play-arena"></div>';
	    },
	    destroyPlayArena: function destroyPlayArena() {
	        var selector = this.getParentInstanceId() ? '#' + this.getParentInstanceId() + ' ' + this.getArenaContainer() + ' #' + this.getUniqueId() : this.getArenaContainer() + ' #' + this.getUniqueId();
	        var node = document.querySelector(selector);
	        node.parentNode.removeChild(node);
	    },
	    getModuleContainer: function getModuleContainer() {
	        return '#' + this.getUniqueId();
	    },
	    publish: function publish(eventName, message) {
	        !this.isDestroyed && _pubsub2.default.publish(this.getCssSelector(), eventName, message);
	    },
	    hasModuleConfig: true
	};

	exports.default = ModuleBase;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.1.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(9);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;
	      var state = parent._state;

	      if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	        return this;
	      }

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);
	      var result = parent._result;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (Array.isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, this._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(7)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), (function() { return this; }()), __webpack_require__(8)(module)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ])
});
;