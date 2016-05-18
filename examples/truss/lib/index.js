"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createInstance = createInstance;

var _utils = require("./helpers/utils");

var _utils2 = _interopRequireDefault(_utils);

var _base = require("./base.js");

var _base2 = _interopRequireDefault(_base);

var _store = require("./store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// STEP:1
var _lockEvents = function _lockEvents(module) {

    module.listensTo && module.listensTo.length && module.listensTo.forEach(function (listener) {
        module.subscribe({
            eventName: listener.eventName,
            callback: module[listener.callback],
            context: module,
            eventPublisher: listener.eventPublisher,
            once: listener.once
        });
    });

    return _listenForInitOn(module);
};

// STEP:2
// FEATURES TO BE ADDED
//Server rendering
//replayEvent
//listensTo
//resolveRenderOn
//onRenderComplete
//initOn

// import {Promise} from "es6-promise";
var _listenForInitOn = function _listenForInitOn(module) {
    console.log("_listenForInitOn called for: " + module.moduleName);
    console.log(module);
    console.log("-------------");

    return new Promise(function (res, rej) {
        res(module.path);
    });
};

// STEP:3
var _callResolveRenderOn = function _callResolveRenderOn() {
    console.log("_callResolveRenderOn called for: " + module.moduleName);
};

// STEP:4
var _callRender = function _callRender(module) {
    // if initOn is present exec below steps on initOn
    // exec resolveRenderOn (if available)
    // exec render after resolveRenderOn completes
    // throw error is render and template are not provided
    console.log("_callRender called for: " + module.moduleName);
    // module.instanceConfig.render();
};

var _startExec = function _startExec(rootModules) {

    if (!rootModules) {
        rootModules = _store.moduleS.filter(function (module) {
            return module.path.split(".").length === 1;
        });
    }

    rootModules.forEach(function (rootModule) {
        // Render this module
        _lockEvents(rootModule).then(function (resolvedPath) {
            // Get module level
            var level = _utils2.default.getLevelsFromPath(rootModule.path);

            // Find next level children
            var childModules = _store.moduleS.filter(function (module) {
                return module.path.indexOf(resolvedPath + ".") > -1 && _utils2.default.getLevelsFromPath(module.path) === level + 1;
            });

            // _startExec all next level children                   
            _startExec(childModules);
        });
    });
};

var _registerModule = function _registerModule(config) {
    var moduleName = arguments.length <= 1 || arguments[1] === undefined ? config.moduleName : arguments[1];
    var instance = arguments.length <= 2 || arguments[2] === undefined ? config.instance : arguments[2];
    var instanceConfig = arguments.length <= 3 || arguments[3] === undefined ? config.instanceConfig : arguments[3];
    var path = arguments.length <= 4 || arguments[4] === undefined ? "" : arguments[4];

    //If root module
    if (!path) {
        path = moduleName;
        // Check if its already present in registered module.
        // If it is, give warning.
        // TODO: Add support to override config
        if (_store.moduleS.findInstance(null, "moduleName", moduleName).length > 0) {
            console.warning("Module (" + moduleName + ") is already registered at same path. Skipping...");
            return;
        }
    }

    //If child modules
    if (path) {
        // Check if its already present in registered module.
        // If it is, give warning.
        if (_store.moduleS.findInstance(path).length > 0) {
            console.warning("Module (" + moduleName + ") is already registered at same path. Skipping...");
            return;
        }
    }

    var moduleDetail = Object.assign({}, { moduleName: moduleName }, _base2.default, instance, { uniqueId: _utils2.default.getNextUniqueId() }, { path: path }, {
        lifeStage: {
            initiated: true,
            eventLocked: false,
            renderDependencyCalled: false,
            renderCalled: false,
            postRenderCalled: false
        }
    }, instanceConfig);

    // Store module
    _store.moduleS.insertInstance(moduleDetail);

    // Has child modules
    if (instance.config && instance.config.modules && instance.config.modules.length) {
        instance.config.modules.forEach(function (childModule) {
            _registerModule(childModule, undefined, undefined, undefined, path + "." + childModule.moduleName);
        });
    }
};

function createInstance(config) {
    _registerModule(config, config.moduleName, config.instance, config.instanceConfig);
    _startExec();
};