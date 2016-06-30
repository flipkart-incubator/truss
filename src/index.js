/**This is the major framework file.
 * @exports {
 * 	createInstance: creates a new instance of the module.
 * 	destroyModuleInstance: destroys the module instance
 *
 * }
 */

import {Promise} from "es6-promise";
import Utils from "./helpers/utils";
import Module from "./interfaces/module.js";
import {moduleS, isBrowser} from "./interfaces/store";

const
	/**
	 * The types of events possible
	 * @private
	 * @readonly
	 * @enum {string}
	 */
	EVENT_ENUM = {
		/**
		 * The event will be listened even when the module has not been rendered.
		 */
		keepOn : "KEEP_ON",
		/**
		 * Whenever this type of event is published, the module will receive all the past events along with the current event in the form of an array
		 */
		replay : "RE_PLAY",
		/**
		 * {@defaultvalue} If the event is of this type then the module starts listening
		 * to the event once the rendering completes.
		 */
		playAfterRender : "PLAY_AFTER_RENDER"
	};

	/**
	 * @readonly
	 * @private
	 * @constant {Object} lifeCycleFlags following fields
	 * <ul>
	 * <li>booted: true </li>
	 * <li>rendered: false</li>
	 * <li>preRenderResolved: false</li>
	 * </ul>
	 */
	lifeCycleFlags = {
		booted: true,
		preRenderResolved: false,
		rendered: false
	};


/**
 * This function resolves the Promise if initOn is true and module is already rendered. Refer {@link lifeCycleFlags} for
 * initial lifecycle values.
 * Calls {@link _callResolveRenderOn} if either case fails
 * @param {Module} module. The module to be rendered.
 * @returns {Promise}
 * @private
 */
let _listenForInitOn = function (module) {

	if (module.instanceConfig.initOn && module.lifeCycleFlags.rendered) {
		return Promise.resolve(module.path);
	} else {
		return _callResolveRenderOn(module);
	}
};

// STEP:2
/**
 *
 * @param {Module} module to be rendered.
 * <p>Calls {@link Module.resolveRenderOn} method . This method is passed from the config for the module and after
 * resolveRenderOn is resolved, lifecycle status is changed to "preRenderResolved". The resolveRenderOn should return
 * {Promise}</p>
 * @private
 */
let _callResolveRenderOn = function (module) {
	if (module.resolveRenderOn) {
		return module.resolveRenderOn().then((res)=> {
			module.lifeCycleFlags.preRenderResolved = true;
			return _lockEvents(module, res);
		});

	} else {
		return _lockEvents(module);
	}

};

// STEP:3 [Hot events]
/**
 * Subscribes to all the events of type playAfterRender
 * @param {Module} module to be rendered.
 * @param placeholderResponse
 * @private
 */
let _lockEvents = function (module, placeholderResponse) {

	module.instanceConfig.listensTo && module.instanceConfig.listensTo.length && module.instanceConfig.listensTo.filter((evt)=> {
		if (evt.type === EVENT_ENUM.playAfterRender || !evt.type) {
			return evt;
		}
	}).forEach((listener) => {
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
/**
 * <p>Renders the module by calling {@link Module.createModuleArena}
 * Changes the life cycle flag to rendered thereafter.</p>
 * @param {Module} module to be rendered.
 * @param placeholderResponse
 * @returns {Promise}
 * @private
 */
let _callRender = function (module, placeholderResponse) {
	// if initOn is present exec below steps on initOn
	// exec resolveRenderOn (if available)
	// exec render after resolveRenderOn completes
	// throw error is render and template are not provided
	console.log("_callRender called for: " + module.moduleName);
	Module.createModuleArena(module);
	return new Promise((res, rej) => {
		// Null to be replaced with resolveRenderOn data

		let compiledHTML = module.render(placeholderResponse, compiledHTML);

		if (module.instanceConfig.onRenderCompelete) {
			module.onRenderCompelete();
		}

		res(module.path, compiledHTML);
		module.lifeCycleFlags.rendered = true;
	});
};

/**
 *<p>Called after the module is registered. Responsible for rendering the module.
 * The rendering will wait till the event occurs if initOn option is provided. </p>
 * <p>This method contains four steps
 * <ul>
 *     <li>call resolveRenderOn method and wait for the promise to be resolved ({@link _callResolveRenderOn})</li>
 *     <li>subscribe to the events of type "playAfterRender"</li>
 *     <li>Render the module</li>
 * </ul>
 * </p>
 *
 * @recursive
 * @param rootModules {Array} The array of modules to be rendered. Initially list is taken from {@link moduleS}
 * @param promiseArr {Array} the array of promise objects
 * @private
 */
let _startExec = function (rootModules, promiseArr) {
	let compiledHTML;

	if (!rootModules) {
		rootModules = moduleS.filter((module) => {
			return module.path.split(".").length === 1;
		});

		if (isBrowser) {
			compiledHTML = undefined;
		}
	}

	rootModules.forEach((rootModule) => {
		// Render this module
		let moduleResolvePromise = new Promise(function (resolve, reject) {
			_listenForInitOn(rootModule)
				.then((resolvedPath) => {
					resolve();

					// Get module level
					let level = Utils.getLevelsFromPath(rootModule.path);

					// Find next level children
					let childModules = moduleS.filter((module) => {
						return (module.path.indexOf(`${resolvedPath}.`) > -1) && (Utils.getLevelsFromPath(module.path) === (level + 1));
					});

					// _startExec all next level children
					_startExec(childModules, promiseArr);
				});
		});
		promiseArr.push(moduleResolvePromise);
	});
};

/**
 *
 * @param module {Module} The Module generated by {@link _registerModule}. If the module listens to any event or if the
 * module is instantiated based on an event then module is made to subscribe all the events.
 * <p>initOn will have following properties
 * <ul>
 *     <li>eventName {String} The name of the event</li>
 *     <li>eventPublisher {String} [Optional] CSS selector of the publisher of the event to which the module is subscribing.
 *     The module listens to event from all the publishers if this field is not provided</li>
 *     <li>context {Object} [Optional] The context in which event is subscribed</li>
 *     <li>callback</li> {function} the callback method for the event
 * </ul>
 * </p>
 * <p>
 * listensTo {array} this is an array of objects (the events) to which the module subscribes
 * <ul>
 *     <li>eventName {String} The name of the event</li>
 *     <li>eventPublisher {String} [Optional] CSS selector of the publisher of the event to which the module is subscribing.
 *     The module listens to event from all the publishers if this field is not provided</li>
 *     <li>context {Object} [Optional] The context in which event is subscribed</li>
 *     <li>callback {function} the callback method for the event</li>
 *     <li>{boolean} [once = false] The callback of the function that can only be called one time if true. Repeated event publish
 *     will have no effect.</li>
 *     <li>[type= "PLAY_AFTER_RENDER"] {EVENT_ENUM} the type of the event </li>
 * </ul>
 * </p>
 * @returns {*}
 * @private
 */
let _registerSubscription = function (module) {

	module.instanceConfig.initOn && module.subscribe({
		eventName: module.instanceConfig.initOn.eventName,
		eventPublisher: module.instanceConfig.initOn.eventPublisher,
		context: module.instanceConfig,
		callback: Utils.partial(_callResolveRenderOn, module)
	});

	module.instanceConfig.listensTo &&
	module.instanceConfig.listensTo.length &&
	module.instanceConfig.listensTo.filter((evt)=> {
		if (evt.type === EVENT_ENUM.keepOn || evt.type === EVENT_ENUM.replay) {
			return evt;
		}
	})
		.forEach((listener) => {
			module.subscribe({
				eventName: listener.eventName,
				callback: module[listener.callback],
				context: module,
				eventPublisher: listener.eventPublisher,
				once: listener.once,
				type: listener.type
			});
		});
};

/**
 *
 * @param config {Object} The configuration of the module to be created. Creates instance of {@link Module} and keeps it
 * in {@link Store}.If the module has child modules then the child modules too will be registered.
 * <p>It must contain following properties
 * <ul style="list-style: none;">
 * <li>1. moduleName {String} The unique name in the workspace of the module
 * <li>2. module {Object}: It is the reference of module to be consumed
 * <li>3. instanceConfig {Object}: the configuration to be passed for that particular module. It must contain following
 * properties:
 *        <ul>
 *         <li>placeholders {Object}
 *         <li>container {String} Css selector of the container element. This should be unique.
 *         <li>listensTo {Array} [Optional] the list of events that the module will listen to.
 *         </ul>
 * </ul>
 * </p>
 * <p>If the module has already been registered on the same path then registration would be skipped and a warning will
 * be generated.</p>
 * <p></p>
 * @param  {String} [moduleName = config.moduleName] The unique name in the workspace of the module
 * @param {Object}[instance = config.module]
 * @param {Object}[instanceConfig = config.instanceConfig]
 * @param {String}[path=""]
 * @private
 */
let _registerModule = function (config, moduleName = config.moduleName, instance = config.module, instanceConfig = config.instanceConfig, path = "") {
	//If root module
	if (!path) {
		path = moduleName;
		// Check if its already present in registered module.
		// If it is, give warning.
		// TODO: Add support to override config
		if (moduleS.findInstance(null, "moduleName", moduleName).length > 0) {
			console.log(`Module (${moduleName}) is already registered at same path. Skipping...`);
			return;
		}
	}

	//If child modules
	if (path) {
		// Check if its already present in registered module.
		// If it is, give warning.
		if (moduleS.findInstance(path).length > 0) {
			console.log(`Module (${moduleName}) is already registered at same path. Skipping...`);
			return;
		}
	}

	let moduleDetail = new Module(moduleName, Utils.getNextUniqueId(), path, lifeCycleFlags, instanceConfig, instance);

	// Store module
	moduleS.insertInstance(moduleDetail);
	_registerSubscription(moduleDetail);

	// Has child modules
	if (instance.config && instance.config.modules && instance.config.modules.length) {
		instance.config.modules.forEach((childModule) => {
			_registerModule(childModule, undefined, undefined, undefined, `${path}.${childModule.moduleName}`);
		});
	}
};

/**
 *
 * Destroys the module . Does the following
 * <ul>
 *     <li>removed DOM element</li>
 *     <li> Unsubscribes events.It calls {@link Module.unsubscribe}</li>
 *     <li> Removes the entry of module from module store </li>
 *     <li> Removes the entry of child modules from module store </li>
 * </ul>
 * @param moduleName {string} The name of the module to be destroyed
 * @param [context = window] {object} @todo . Reserved for future enhancement
 * @returns {boolean} true when module gets deleted successfully
 */
export function destroyModuleInstance(moduleName, context = window) {

	// Remove module DOM and unsubscribe ots events
	let moduleInstance = moduleS.findInstance(moduleName);
	moduleInstance.forEach((module)=> {

		let moduleSubscriptions = module.getAllSubscriptions();
		moduleSubscriptions.forEach(function (subscription) {
			module.unsubscribe(subscription.eventName, subscription.callback);
		});

		context.document.querySelector(`#${module.getUniqueId()}`).parentNode.remove();
	});

	// Remove module from store
	moduleS.deleteInstance(moduleName);

	// Remove child modules from store
	let children = moduleS.filter((module) => {
		if (module.path.indexOf(`${moduleName}.`) > -1) {
			return module;
		}
	});

	children.forEach((module)=> {
		moduleS.deleteInstance(module.moduleName);
	});

	return true;
};

/**
 *
 * @param config {Object} The configuration of the module to be created. It must contain following properties
 * <ul style="list-style: none;">
 * <li>1. moduleName {String} The unique name in the workspace of the module
 * <li>2. module {Object}: It is the reference of module to be consumed
 * <li>3. instanceConfig: the configuration to be passed for that particular module. It must contain following properties:
 *        <ul>
 *         <li>placeholders {Object}
 *         <li>container {String} Css selector of the container element. This should be unique.
 *         <li>listensTo {Array} [Optional] the list of events that the module will listen to.
 *         </ul>
 *  <li>4. resolveRenderOn: {function}</li>
 * </ul>
 * @returns {Promise} Resolves when all the modules are rendered.
 */
export function createInstance(config) {
	let moduleResolvePromiseArr = [],
		promise;

	_registerModule(config, config.moduleName, config.module, config.instanceConfig);
	_startExec(null, moduleResolvePromiseArr);

	promise = new Promise((res, rej)=> {
		Promise.all(moduleResolvePromiseArr).then(()=> {
			res();
		})
	});

	return promise;
};


export default {
	createInstance,
	destroyModuleInstance
};
