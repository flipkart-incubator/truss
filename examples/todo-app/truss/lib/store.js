"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var moduleS = Object.assign([], {
    getObjByPath: function getObjByPath(path) {
        var _this = this;

        var pointer = void 0;
        path.split(".").forEach(function (path) {
            pointer = pointer || _this;
            pointer = pointer[path];
        });
        return pointer;
    },

    insertInstance: function insertInstance(instance, path) {
        var pointer = void 0;
        if (path) {
            pointer = this.getObjByPath(path);
        } else {
            pointer = this;
        }
        pointer.push(instance);
    },

    deleteInstance: function deleteInstance(path) {
        if (typeof path === "string") {
            var tPath = path.split(".");
            var key = tPath.splice(tPath.length - 1, 1);
            delete this.getObjByPath(tPath.join("."))[key];
        }
    },

    findInstance: function findInstance(path, searchKey, searchValue) {
        return this.filter(function (item) {
            if (path) {
                return item.path === path;
            } else if (searchValue && searchKey) {
                if (item[searchKey] === searchValue) {
                    return true;
                }
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

var subscriptions = {};

exports.isBrowser = isBrowser;
exports.subscriptions = subscriptions;
exports.moduleS = moduleS;