"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _es6Promise = require("es6-promise");

var _utils = require("./helpers/utils");

var _utils2 = _interopRequireDefault(_utils);

var _base = require("./interfaces/base.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleStore = [];

var modules = {},
    subscriptions = {},
    allModuleInstances = {};

var getModuleInstance = function getModuleInstance(core, moduleName, config, parentInstanceId) {
    var moduleInstance,
        module = modules[moduleName],
        listensTo = config.instanceConfig.listensTo || [],
        moduleInstanceId,
        baseModuleInstance = new _base2.default({
        parentInstanceId: parentInstanceId,
        moduleName: moduleName,
        instanceConfig: config.instanceConfig,
        uniqueId: _utils2.default.getNextUniqueId(),
        parentCssSelector: parentInstanceId ? allModuleInstances[parentInstanceId].moduleInstance.getCssSelector() : undefined
    });

    moduleInstance = Object.assign(baseModuleInstance, module.properties);
    moduleInstanceId = moduleInstance.getUniqueId();

    //Add module to the list of composite modules of parent
    if (parentInstanceId) {
        allModuleInstances[parentInstanceId].modules.push(moduleInstanceId);
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
    listensTo.forEach(function (listener) {
        moduleInstance.subscribe({
            eventName: listener.eventName,
            callback: moduleInstance[listener.callback],
            context: moduleInstance,
            eventPublisher: listener.eventPublisher,
            once: listener.once
        });
    });

    return moduleInstance;
};

var stopModuleInstantiation = function stopModuleInstantiation(code) {
    return _es6Promise.Promise.reject();
};

var methods = {

    register: function register(moduleName, properties) {
        if (!modules[moduleName]) modules[moduleName] = { properties: properties };
    },

    loadModule: function loadModule(moduleArr) {
        var _this = this;

        if (!Array.isArray(moduleArr)) {
            moduleArr = [moduleArr];
        }

        moduleArr.forEach(function (moduleObj) {
            var moduleName = moduleObj.moduleName;
            if (modules[moduleName]) return;

            if (moduleObj.instance) {
                _this.register(moduleName, moduleObj.instance);
            } else {
                console.error("No moduleInstance provided with name " + moduleName);
            }
        });
    },

    createInstance: function createInstance(moduleObj) {
        var instanceConfig = arguments.length <= 1 || arguments[1] === undefined ? moduleObj.instanceConfig : arguments[1];
        var parentInstanceId = arguments[2];


        // If module is already not registered, try registering it.
        if (!modules[moduleObj.moduleName]) {
            this.loadModule(moduleObj);
        }

        var moduleName = moduleObj.moduleName,
            module = modules[moduleName];

        // If module instance is not present, throw error
        if (!module) {
            console.error("Could not find instance for module config: " + moduleObj);
        }

        var self = this,
            config = void 0;

        var createInstancePromise = new _es6Promise.Promise(function (resolve, reject) {

            if (parentInstanceId && !allModuleInstances[parentInstanceId]) {
                return stopModuleInstantiation("CONFIG_FETCHED");
            }

            // Create module instance
            var moduleInstance = getModuleInstance(self, moduleName, { instanceConfig: instanceConfig }, parentInstanceId);
            var moduleInstanceId = moduleInstance.getUniqueId();

            var promise = new _es6Promise.Promise(function (resolve) {
                if (instanceConfig.initOn) {
                    var initOn = instanceConfig.initOn;
                    return moduleInstance.subscribe({
                        eventName: initOn.eventName,
                        callback: function callback(data) {
                            resolve(data);
                        },
                        context: moduleInstance,
                        eventPublisher: initOn.eventPublisher,
                        once: true
                    });
                }

                //Module instance is created and subscribed to events
                moduleInstance.publish(moduleInstance.getModuleName() + '_CREATED', {
                    moduleInstanceId: moduleInstanceId
                });
                resolve();
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

        console.debug("Event unsubscribed:", eventName, subscriptionsForEvent);
    }
};

exports.default = methods;