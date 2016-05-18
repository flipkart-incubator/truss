import Utils from "./helpers/utils";
import {moduleS, subscriptions, isServer} from "./store";



var _getCSSSelector = function (instanceConfig) {
    return `${instanceConfig.container} ${instanceConfig.uniqueId}`;
};



export function _createModuleArena (instanceConfig, compiledHTML) {
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
}



export default {
    render: function (placeholderData, compiledHTML) {
        
        const containerSelector = this.uniqueId;
        const placeholders = placeholderData || this.placeholders;
        document.querySelector(`#${containerSelector}`).innerHTML = this.template(placeholders);
    },

    subscribe: function (subscription, eventName = subscription.eventName) {
        if (!subscriptions[eventName]) subscriptions[eventName] = [];
        let subscriptionData = Utils.pick(subscription, ['callback', 'context', 'eventPublisher', 'once']);
        subscriptions[eventName].push(subscriptionData);
        console.log(subscriptions);
        console.log("---------");
    },

    publish: function (eventName, message) {
        let publisher = _getCSSSelector(this),
            subscriptionsForEvent = subscriptions[eventName],
            remainingSubscriptions = [];

        console.log(subscriptions);

        if (subscriptionsForEvent && subscriptionsForEvent.length) {
            subscriptionsForEvent.forEach(function (subscription) {
                var callback = subscription.callback,
                    context = subscription.context,
                    subscribeOnce = subscription.once;

                if (subscription.eventPublisher) {
                    var regex = new RegExp(subscription.eventPublisher + "$");
                    if(regex.test(publisher)) {
                        callback.apply(context ? context : null, [message]);
                        if(!subscribeOnce) {
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
                            }
                            else {
                                actualPublisherHierarchy.pop();
                            }
                        }

                        if (!subscriptionPublisherHierarhcy.length) {
                            callback.apply(context ? context : null, [message]);
                            if(!subscribeOnce) {
                                remainingSubscriptions.push(subscription);
                            }
                        }
                        else {
                            remainingSubscriptions.push(subscription);
                        }
                    }
                } else {
                    callback.apply(context ? context : null, [message]);
                    if(!subscribeOnce) {
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
            return !(subscription.callback === callback);
        });
    }
}