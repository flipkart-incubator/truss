"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PubSubHelper = undefined;

var _pubsub = require("./interfaces/pubsub");

var _pubsub2 = _interopRequireDefault(_pubsub);

var _truss = require("./truss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PubSubHelper = exports.PubSubHelper = new _pubsub2.default();

/**
 * @
 */
exports.default = {
  createInstance: _truss.createInstance,
  destroyModuleInstance: _truss.destroyModuleInstance,
  use: _truss.use
};