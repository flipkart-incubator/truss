"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.destroyModuleInstance = destroyModuleInstance;
exports.createInstance = createInstance;

var _es6Promise = require("es6-promise");

var _utils = require("./helpers/utils");

var _utils2 = _interopRequireDefault(_utils);

var _module = require("./interfaces/module.js");

var _module2 = _interopRequireDefault(_module);

var _store = require("./interfaces/store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var evtKeepOn = "KEEP_ON",
    evtReplay = "RE_PLAY",
    evtPlayAfterRender = "PLAY_AFTER_RENDER",
    lifeCycleFlags = {
	booted: true,
	preRenderResolved: false,
	rendered: false
};

// STEP:1
var _listenForInitOn = function _listenForInitOn(module) {

	if (module.instanceConfig.initOn && module.lifeCycleFlags.rendered) {
		return _es6Promise.Promise.resolve(module.path);
	} else {
		return _callResolveRenderOn(module);
	}
};

// STEP:2
var _callResolveRenderOn = function _callResolveRenderOn(module) {
	if (module.resolveRenderOn) {

		return module.resolveRenderOn().then(function (res) {
			module.lifeCycleFlags.preRenderResolved = true;
			return _lockEvents(module, res);
		});
	} else {
		return _lockEvents(module);
	}
};

// STEP:3 [Hot events]
var _lockEvents = function _lockEvents(module, placeholderResponse) {

	module.instanceConfig.listensTo && module.instanceConfig.listensTo.length && module.instanceConfig.listensTo.filter(function (evt) {
		if (evt.type === evtPlayAfterRender || !evt.type) {
			return evt;
		}
	}).forEach(function (listener) {
		module.subscribe({
			eventName: listener.eventName,
			callback: module[listener.callback],
			context: module,
			eventPublisher: listener.eventPublisher,
			once: listener.once
		});
	});

	return _callRender(module, placeholderResponse);
};

// STEP:4
var _callRender = function _callRender(module, placeholderResponse) {
	// if initOn is present exec below steps on initOn
	// exec resolveRenderOn (if available)
	// exec render after resolveRenderOn completes
	// throw error is render and template are not provided
	console.log("_callRender called for: " + module.moduleName);
	_module2.default.createModuleArena(module);
	return new _es6Promise.Promise(function (res, rej) {
		// Null to be replaced with resolveRenderOn data

		var compiledHTML = module.render(placeholderResponse, compiledHTML);

		if (module.instanceConfig.onRenderCompelete) {
			module.onRenderCompelete();
		}

		res(module.path, compiledHTML);
		module.lifeCycleFlags.rendered = true;
	});
};

var _startExec = function _startExec(rootModules) {
	var compiledHTML = void 0;
	if (!rootModules) {
		rootModules = _store.moduleS.filter(function (module) {
			return module.path.split(".").length === 1;
		});

		if (_store.isBrowser) {
			compiledHTML = undefined;
		}
	}

	rootModules.forEach(function (rootModule) {
		// Render this module
		_listenForInitOn(rootModule).then(function (resolvedPath) {
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

// Only for initON
var _registerSubscription = function _registerSubscription(module) {

	module.instanceConfig.initOn && module.subscribe({
		eventName: module.instanceConfig.initOn.eventName,
		eventPublisher: module.instanceConfig.initOn.eventPublisher,
		context: module.instanceConfig,
		callback: _utils2.default.partial(_callResolveRenderOn, module)
	});

	module.instanceConfig.listensTo && module.instanceConfig.listensTo.length && module.instanceConfig.listensTo.filter(function (evt) {
		if (evt.type === evtKeepOn || evt.type === evtReplay) {
			return evt;
		}
	}).forEach(function (listener) {
		module.subscribe({
			eventName: listener.eventName,
			callback: module[listener.callback],
			context: module,
			eventPublisher: listener.eventPublisher,
			once: listener.once,
			type: listener.type
		});
	});

	return _es6Promise.Promise.resolve(module.path);
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

	var moduleDetail = new _module2.default(moduleName, _utils2.default.getNextUniqueId(), path, lifeCycleFlags, instanceConfig, instance);

	// Store module
	_store.moduleS.insertInstance(moduleDetail);
	_registerSubscription(moduleDetail);

	// Has child modules
	if (instance.config && instance.config.modules && instance.config.modules.length) {
		instance.config.modules.forEach(function (childModule) {
			_registerModule(childModule, undefined, undefined, undefined, path + "." + childModule.moduleName);
		});
	}
};

function destroyModuleInstance(moduleName) {
	var context = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];


	// Remove module DOM and unsubscribe ots events
	var moduleInstance = _store.moduleS.findInstance(moduleName);
	moduleInstance.forEach(function (module) {

		var moduleSubscriptions = module.getAllSubscriptions();
		moduleSubscriptions.forEach(function (subscription) {
			module.unsubscribe(subscription.eventName, subscription.callback);
		});

		context.document.querySelector("#" + module.getUniqueId()).parentNode.remove();
	});

	// Remove module from store
	_store.moduleS.deleteInstance(moduleName);

	// Remove child modules from store
	var children = _store.moduleS.filter(function (module) {
		if (module.path.indexOf(moduleName + ".") > -1) {
			return module;
		}
	});

	children.forEach(function (module) {
		_store.moduleS.deleteInstance(module.moduleName);
	});
};

function createInstance(config) {
	_registerModule(config, config.moduleName, config.instance, config.instanceConfig);
	return _startExec();
};

exports.default = {
	createInstance: createInstance,
	destroyModuleInstance: destroyModuleInstance
};