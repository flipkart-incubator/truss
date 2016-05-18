"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _core = require("../core");

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