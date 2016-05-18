import Utils from "./helpers/utils";
import {moduleS, subscriptions, isServer} from "./store";

var _createModuleArena = function (instanceConfig, compiledHTML) {

    // If compiledHTML is not provided, start creating dom element progressively.
    if (typeof compiledHTML !== "string") {
        document.querySelector(instanceConfig.container).innerHTML = `<div id="${instanceConfig.uniqueId}"></div>`;
        return;
    }

    // If compiledHTML is provided, create page string.
    if (compiledHTML.trim() === "") {
        compiledHTML = `<div id="${instanceConfig.uniqueId}"></div>`;
    } else {

    }

    return compiledHTML;
};

var _getCSSSelector = function (instanceConfig) {
    return `${instanceConfig.container} ${instanceConfig.uniqueId}`;
};

export default {
    render: function (placeholderData, compiledHTML) {
        _createModuleArena(this, compiledHTML);
        
        const containerSelector = this.uniqueId;
        const placeholders = placeholderData || this.placeholders;
        document.querySelector(`#${containerSelector}`).innerHTML = this.template(placeholders);
    },

    subscribe: function (subscription, eventName = subscription.eventName) {        
        if (!subscriptions[eventName]) subscriptions[eventName] = [];
        let subscriptionData = Utils.pick(subscription, ['callback', 'context', 'eventPublisher', 'once']);
        subscriptions[eventName].push(subscriptionData);
    },

    publish: function () {
        
    },

    unsubscribe: function (subscriber, eventName, callback) {
        var subscriptionsForEvent = subscriptions[eventName];

        subscriptions[eventName] = subscriptionsForEvent.filter(function (subscription) {
            return !(subscription.callback === callback);
        });
    }
}