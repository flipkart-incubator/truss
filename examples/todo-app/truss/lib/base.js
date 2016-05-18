"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require("./helpers/utils");

var _utils2 = _interopRequireDefault(_utils);

var _store = require("./store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createModuleArena = function _createModuleArena(instanceConfig) {
    document.querySelector(instanceConfig.container).innerHTML = "<div id=\"" + instanceConfig.uniqueId + "\"></div>";
};

var _getCSSSelector = function _getCSSSelector(instanceConfig) {
    return instanceConfig.container + " " + instanceConfig.uniqueId;
};

exports.default = {
    render: function render(placeholderData) {
        _createModuleArena(this);

        var containerSelector = this.uniqueId;
        var placeholders = placeholderData || this.modulePlaceholders;
        document.querySelector("#" + containerSelector).innerHTML = this.template(placeholders);
    },

    subscribe: function subscribe(subscription) {
        var eventName = arguments.length <= 1 || arguments[1] === undefined ? subscription.eventName : arguments[1];

        if (!_store.subscriptions[eventName]) _store.subscriptions[eventName] = [];
        var subscriptionData = _utils2.default.pick(subscription, ['callback', 'context', 'eventPublisher', 'once']);
        _store.subscriptions[eventName].push(subscriptionData);
    },

    publish: function publish() {},

    unsubscribe: function unsubscribe(subscriber, eventName, callback) {
        var subscriptionsForEvent = _store.subscriptions[eventName];

        _store.subscriptions[eventName] = subscriptionsForEvent.filter(function (subscription) {
            return !(subscription.callback === callback);
        });
    }
};