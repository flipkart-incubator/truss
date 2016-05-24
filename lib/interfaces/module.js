"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _utils = require("../helpers/utils");

var _utils2 = _interopRequireDefault(_utils);

var _store = require("./store");

var _pubsub = require("./pubsub");

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Module = function () {
	var modulePrivateData = new WeakMap();

	var Module = function (_PubSub) {
		_inherits(Module, _PubSub);

		function Module(moduleName, uniqueId, path, lifeCycleFlags, instanceConfig, instanceData) {
			_classCallCheck(this, Module);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Module).call(this));

			_this.moduleName = moduleName;
			_this.path = path;
			_this.lifeCycleFlags = lifeCycleFlags;
			_this.instanceConfig = instanceConfig;

			for (var key in instanceData) {
				_this[key] = instanceData[key];
			}

			modulePrivateData.set(_this, {
				moduleSubscriptions: [],
				uniqueId: uniqueId
			});
			return _this;
		}

		_createClass(Module, [{
			key: "render",
			value: function render(placeholderData) {

				var containerSelector = this.getUniqueId();
				var placeholders = placeholderData || this.instanceConfig.placeholders;
				document.querySelector("#" + containerSelector).innerHTML = this.template(placeholders);
			}
		}, {
			key: "getAllSubscriptions",
			value: function getAllSubscriptions() {
				return modulePrivateData.get(this).moduleSubscriptions;
			}
		}, {
			key: "getUniqueId",
			value: function getUniqueId() {
				return modulePrivateData.get(this).uniqueId;
			}
		}, {
			key: "getParentInstanceId",
			value: function getParentInstanceId() {
				var path = this.path.split(".");

				path.pop();

				var parentPath = path.join("."),
				    parent = _store.moduleS.filter(function (module) {
					if (module.path === parentPath) {
						return module.getUniqueId();
					}
				});

				if (parent.length) {
					return parent[0].getUniqueId();
				} else {
					return "";
				}
			}
		}, {
			key: "getModuleContainer",
			value: function getModuleContainer() {
				return "#" + this.getUniqueId();
			}
		}, {
			key: "getModuleName",
			value: function getModuleName() {
				return this.moduleName;
			}
		}, {
			key: "getInstanceConfig",
			value: function getInstanceConfig() {
				return this.instanceConfig.placeholders;
			}
		}, {
			key: "getCSSSelector",
			value: function getCSSSelector() {
				return _utils2.default.getCSSSelector();
			}
		}, {
			key: "destroy",
			value: function destroy() {}
		}, {
			key: "subscribe",
			value: function subscribe(subscription) {
				var eventName = arguments.length <= 1 || arguments[1] === undefined ? subscription.eventName : arguments[1];

				subscription.eventSubscriber = this.getModuleContainer();
				modulePrivateData.get(this).moduleSubscriptions.push(subscription);
				_get(Object.getPrototypeOf(Module.prototype), "subscribe", this).call(this, subscription, eventName);
			}
		}, {
			key: "publish",
			value: function publish(eventName, message) {
				_get(Object.getPrototypeOf(Module.prototype), "publish", this).call(this, eventName, message);
			}
		}, {
			key: "unsubscribe",
			value: function unsubscribe(eventName, callback) {
				_get(Object.getPrototypeOf(Module.prototype), "unsubscribe", this).call(this, this.getModuleContainer(), eventName, callback);
			}
		}], [{
			key: "createModuleArena",
			value: function createModuleArena(module, compiledHTML) {
				// If compiledHTML is not provided, start creating dom element progressively.
				if (typeof compiledHTML !== "string") {
					document.querySelector(module.instanceConfig.container).innerHTML = "<div id=\"" + module.getUniqueId() + "\"></div>";
					return;
				}

				// If compiledHTML is provided, create page string.
				if (compiledHTML.trim() === "") {
					compiledHTML = "<div id=\"" + module.getUniqueId() + "\"></div>";
				} else {}

				return compiledHTML;
			}
		}]);

		return Module;
	}(_pubsub2.default);

	return Module;
}();

exports.default = Module;