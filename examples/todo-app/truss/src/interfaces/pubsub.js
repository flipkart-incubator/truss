/**
 * A Plugin extends core and sandbox, NOT JUST CORE
 * Sandbox needs to be extended to access the new core methods
 *
 * A plugin can be used in multiple ways:
 * -By a plugin
 * -By a module
 */
import Core from "../core";

export default {
    publish: function (publisher, eventName, message) {
        Core.publish(publisher, eventName, message);
    },
    subscribe: function (subscription) {
        Core.subscribe(subscription);
    },
    unsubscribe: function (subscriber, eventName, callback) {
        Core.unsubscribe(subscriber, eventName, callback);
    }
};
