import {Promise} from "es6-promise";
import Utils from "./helpers/utils";
import Base from "./base.js";

let isBrowser = typeof window !== "undefined",
    moduleStore = Object.assign([], {
        getObjByPath: function(path){
            let pointer;
            path.split(".").forEach((path) => {
                pointer = pointer || this;
                pointer = pointer[path];
            });
            return pointer;
        },

        insertInstance: function(instance, path){
            let pointer;
            if(path){
                pointer = this.getObjByPath(path);
            } else {
                pointer = this;
            }
            pointer.push(instance);
        },

        deleteInstance: function(path){
            if(typeof path === "string"){
                let tPath = path.split(".");
                let key = tPath.splice(tPath.length - 1, 1);
                delete this.getObjByPath(tPath.join("."))[key];
            }
        },

        findInstance: function(path, searchKey, searchValue){
            return this.filter(function(item){
                if(path){
                    return item.path === path;
                } else if(searchValue && searchKey){
                    if(item[searchKey] === searchValue){
                        return true;
                    }
                }
            });
        },

        overrideInstance: function(path, searchKey, searchValue, overrideData, searchInAll){
            let pointer;

            if(path){
                pointer = this.getObjByPath(path);
            } else {
                pointer = this;
            }

            for(var key in overrideData){
                pointer[key] = overrideData[key];
            }
        }
    }),
    execAccumulator = [],
    subscriptions = {};

let modules = {},
    allModuleInstances = {};

var methods = {

    // FEATURES TO BE ADDED
    //Server rendering
    //replayEvent
    //listensTo
    //resolveRenderOn
    //onRenderComplete
    //initOn

    __lockEvents: function(module){

    },

    __callRender: function (module) {
        // if initOn is present exec below steps on initOn
        // exec resolveRenderOn (if available)
        // exec render after resolveRenderOn completes
        // throw error is render and template are not provided
        module.instanceConfig.render();
    },

    __startExec: function(){
        execAccumulator.forEach((phaseModules) => {
            phaseModules.forEach((module) => {

                module.instanceConfig.__createModuleArena();
                module.flags.initiated = true;

                this.__lockEvents(module);


                this.__callRender(module);
            });
        });
    },


    __registerModule: function(config, moduleName = config.moduleName, instance = config.instance, instanceConfig = config.instanceConfig, path = ""){
        //If root module
        if(!path){
            path = moduleName;
            // Check if its already present in registered module.
            // If it is, give warning.
            // TODO: Add support to override config
            if (moduleStore.findInstance(null, "moduleName", moduleName).length > 0){
                console.warning(`Module (${moduleName}) is already registered at same path. Skipping...`);
                return;
            }
        }

        //If child modules
        if(path){
            // Check if its already present in registered module.
            // If it is, give warning.
            if (moduleStore.findInstance(path).length > 0){
                console.warning(`Module (${moduleName}) is already registered at same path. Skipping...`);
                return;
            }
        }

        let moduleDetail = {
            moduleName,
            parentConfig: config,
            instanceConfig: Object.assign({}, Base, instance, {
                modulePlaceholders: config.instanceConfig.placeholders,
                parentContainer: config.instanceConfig.container,
                uniqueId: Utils.getNextUniqueId()
            }),
            path,
            flags: {
                initiated: false,
                eventLocked: false,

                // After initOn
                renderDependencyCalled: false,
                renderCalled: false,
                postRenderCalled: false
            }
        };

        // Store module
        let arrayPointer = path.split(".").length - 1;
        if(Array.isArray(execAccumulator[arrayPointer])){
            execAccumulator[arrayPointer].push(moduleDetail);
        } else {
            execAccumulator[arrayPointer] = [moduleDetail];
        }

        //moduleStore.insertInstance(moduleDetail);

        // Has child modules
        if(instance.config.modules && instance.config.modules.length){
            instance.config.modules.forEach((childModule) => {
                this.__registerModule(childModule, undefined, undefined, undefined, `${path}.${childModule.moduleName}`);
            });
        }
    },


    /**
     *
     * @param config
     * @param name
     * @param instance
     * @param instanceConfig
     */
    createInstance: function (config) {
        this.__registerModule(config, config.moduleName, config.instance, config.instanceConfig);
        this.__startExec();
    },

    destroyModuleInstance: function (moduleInstanceId) {
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

    loadApp: function (appConfig) {
        this.publish('CORE', 'APP_LOADED', appConfig);
    },

    subscribe: function (subscription) {
        var eventName = subscription.eventName;

        if (!subscriptions[eventName]) {
            subscriptions[eventName] = [];
        }

        subscriptions[eventName].push(Utils.pick(subscription, ['callback', 'eventSubscriber', 'context', 'eventPublisher', 'once', ]));
        console.debug("Event subscribed:", eventName, subscription);
    },

    publish: function (publisher, eventName, message) {
        var subscriptionsForEvent = subscriptions[eventName],
            remainingSubscriptions = [];

        console.debug("Event published:", eventName, {
            eventName: eventName,
            message: message,
            publisher: publisher,
            subscription: subscriptionsForEvent
        });

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
                    }
                    else {
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
                            }
                            else {
                                actualPublisherHierarchy.pop();
                            }
                        }

                        if (!subscriptionPublisherHierarhcy.length) {
                            // console.debug("Event published. calling..", callback);
                            callback.apply(context ? context : null, [message]);
                            if (!subscribeOnce) {
                                remainingSubscriptions.push(subscription);
                            }
                        }
                        else {
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

    unsubscribe: function (subscriber, eventName, callback) {
        var subscriptionsForEvent = subscriptions[eventName];

        subscriptions[eventName] = subscriptionsForEvent.filter(function (subscription) {
            return !(subscription.callback === callback && subscription.eventSubscriber === subscriber);
        });

        console.debug("Event unsubscribed:", eventName, subscriptionsForEvent);
    }
};

export default methods;
