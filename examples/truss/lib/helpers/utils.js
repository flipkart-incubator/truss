'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var uniqueIdsTill = -1;

function charsLeftIndex(string, chars) {
    var index = -1,
        length = string.length;

    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
}

function charsRightIndex(string, chars) {
    var index = string.length;

    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
}

exports.default = {
    getLevelsFromPath: function getLevelsFromPath(str, letter) {
        return (str.match(RegExp("\\.", 'g')) || []).length;
    },
    getNextUniqueId: function getNextUniqueId() {
        return 'UIF-' + ++uniqueIdsTill;
    },
    pick: function pick(obj, arr) {
        var o = {};
        arr.forEach(function (key) {
            o[key] = obj[key];
        });

        return o;
    },
    length: function length(obj) {
        if (Array.isArray(obj)) {
            return obj.length;
        } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object") {
            return Object.keys(obj).length;
        } else if (typeof obj === "string") {
            return obj.length;
        } else {
            return 0;
        }
    },
    trim: function trim(string, chars) {
        return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
    },
    clearSlashes: function clearSlashes(string) {
        return this.trim(string, "/");
    }
};