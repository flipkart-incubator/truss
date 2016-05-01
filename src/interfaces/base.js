import PubSubHelper from "./pubsub";

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
        PubSubHelper.subscribe(subscription);
    };
    this.unsubscribe = function (eventName, callback) {
        moduleSubscriptions = moduleSubscriptions.filter(function (subscription) {
            return subscription.callback !== callback || subscription.eventName !== eventName;
        });

        PubSubHelper.unsubscribe(this.getModuleContainer(), eventName, callback);
    };
    this.getAllSubscriptions = function () {
        return moduleSubscriptions;
    };

    this.getArenaContainer = function () {
        return config.instanceConfig.container;
    };

    this.getCssSelector = function () {
        return config.parentCssSelector ? config.parentCssSelector + ' ' + this.getArenaContainer() : this.getArenaContainer();
    }
}

ModuleBase.prototype = {
    init: function () {
        var self = this;
        if(!this.render && this.template ){
            return new Promise(function(resolve){
                const containerSelector = self.getModuleContainer();
                const placeholders = self.modulePlaceholders;

                document.querySelector(containerSelector).innerHTML = self.template(placeholders);
                resolve();
            });
        }

        return this.render();
    },
    setup: function () {
        // Nothing to do here
    },
    destroy: function () {
        var containerNode = document.querySelector(this.getModuleContainer());
        containerNode.innerHTML = "";
    },
    createPlayArena: function () {
        var selector = this.getParentInstanceId() ? '#' + this.getParentInstanceId() + ' ' + this.getArenaContainer() : this.getArenaContainer(),
            themeClass = this.getInstanceConfig().theme ? this.getModuleName() + '-' + this.getInstanceConfig().theme : this.getModuleName() + '-default';

        document.querySelector(selector).innerHTML = '<div id="' + this.getUniqueId() + '" class="' + themeClass + ' play-arena"></div>';
    },
    destroyPlayArena: function () {
        var selector = this.getParentInstanceId() ? '#' + this.getParentInstanceId() + ' ' + this.getArenaContainer() + ' #' + this.getUniqueId() : this.getArenaContainer() + ' #' + this.getUniqueId();
        var node = document.querySelector(selector);
        node.parentNode.removeChild(node);
    },
    getModuleContainer: function () {
        return '#' + this.getUniqueId();
    },
    publish: function (eventName, message) {
        !this.isDestroyed && PubSubHelper.publish(this.getCssSelector(), eventName, message);
    },
    hasModuleConfig: true
};

export default ModuleBase;
