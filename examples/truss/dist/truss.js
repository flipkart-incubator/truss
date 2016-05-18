(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Truss"] = factory();
	else
		root["Truss"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createInstance = createInstance;

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _base = __webpack_require__(3);

	var _base2 = _interopRequireDefault(_base);

	var _store = __webpack_require__(2);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _store = __webpack_require__(2);

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])
});
;