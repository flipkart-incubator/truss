"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var moduleS = _extends([], {

    insertInstance: function insertInstance(instance, path) {
        var pointer = void 0;
        if (path) {
            pointer = this.getObjByPath(path);
        } else {
            pointer = this;
        }
        pointer.push(instance);
    },

    deleteInstance: function deleteInstance(name) {

        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i].moduleName === name) {
                this.splice(i, 1);
                break;
            }
        }
    },

    findInstance: function findInstance(name) {
        return this.filter(function (module) {
            if (module.moduleName === name) {
                return module;
            }
        });
    },

    overrideInstance: function overrideInstance(path, searchKey, searchValue, overrideData, searchInAll) {
        var pointer = void 0;

        if (path) {
            pointer = this.getObjByPath(path);
        } else {
            pointer = this;
        }

        for (var key in overrideData) {
            pointer[key] = overrideData[key];
        }
    }
});

var isBrowser = typeof window !== "undefined";

var isServer = !isBrowser;

var subscriptions = {};

var eventQ = { store: [] };

exports.isBrowser = isBrowser;
exports.subscriptions = subscriptions;
exports.moduleS = moduleS;
exports.isServer = isServer;
exports.eventQ = eventQ;