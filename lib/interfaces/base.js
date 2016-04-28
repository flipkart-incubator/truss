"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pubsub = require("./pubsub");

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