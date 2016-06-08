import Utils from "../helpers/utils";
import {moduleS} from "./store";
import PubSub from "./pubsub";

/**
 * All the modules created by this framework will be extended by this Module.
 * @module Module
 */
let Module = (function () {
	let modulePrivateData = new WeakMap();

	/**
	 * @class
	 * @extends {@link PubSub}
	 */
	class Module extends PubSub {
		/**
		 *
		 * @param moduleName {string} the name of the module
		 * @param uniqueId {string} the unique id of the module
		 * @param path {string} the path of the module
		 * @param lifeCycleFlags {lifeCycleFlags} the initial value of the lifecycle flags
		 * @param instanceConfig the configuration of the module passed
		 * @param instanceData It is the reference of module
		 */
		constructor(moduleName, uniqueId, path, lifeCycleFlags, instanceConfig, instanceData) {
			super();

			this.moduleName = moduleName;
			this.path = path;
			this.lifeCycleFlags = lifeCycleFlags;
			this.instanceConfig = instanceConfig;

			for (let key in instanceData) {
				this[key] = instanceData[key];
			}


			modulePrivateData.set(this, {
				moduleSubscriptions: [],
				uniqueId: uniqueId
			});
		}

		/**
		 * renders the template using placeholder
		 * @param placeholderData : The placeholder data for creation of template
		 */
		render(placeholderData) {

			const containerSelector = this.getUniqueId();
			const placeholders = placeholderData || this.instanceConfig.placeholders;
			document.querySelector(`#${containerSelector}`).innerHTML = this.template(placeholders);
		};

		/**
		 * gets all the events of all types subscribed by the module
		 * @returns {array} array of subscriptions
		 */
		getAllSubscriptions() {
			return modulePrivateData.get(this).moduleSubscriptions;
		};

		/**
		 * gets the unique id of the module
		 * @returns {string}
		 */
		getUniqueId() {
			return modulePrivateData.get(this).uniqueId;
		};

		/**
		 * gets the unique id  of the parent element
		 * @returns {string}
		 */
		getParentInstanceId() {
			let path = this.path.split(".");

			path.pop();

			let parentPath = path.join("."),
				parent = moduleS.filter((module)=> {
					if (module.path === parentPath) {
						return module.getUniqueId()
					}
				});

			if (parent.length) {
				return parent[0].getUniqueId();
			} else {
				return "";
			}
		};

		/**
		 *
		 * @returns {string}
		 */
		getModuleContainer() {
			return `#${this.getUniqueId()}`;
		};

		/**
		 *
		 * @returns {Module.moduleName}
		 */
		getModuleName() {
			return this.moduleName;
		};

		/**
		 *
		 * @returns {Module.instanceConfig.placeholders}
		 */
		getInstanceConfig() {
			return this.instanceConfig.placeholders;
		};

		/**
		 *
		 * @returns {string}
		 */
		getCSSSelector() {
			return Utils.getCSSSelector();
		};

		/**
		 * @todo destroy the module instance
		 */
		destroy() {

		};

		/**
		 * subscribe to the event
		 * @param subscription
		 * @param [eventName = subscription.eventName] {string}
		 */
		subscribe(subscription, eventName = subscription.eventName) {
			subscription.eventSubscriber = this.getModuleContainer();
			modulePrivateData.get(this).moduleSubscriptions.push(subscription);
			super.subscribe(subscription, eventName);
		};

		/**
		 * calls {@link PubSub.publish}
		 * @param eventName {string}
		 * @param message {string}
		 */
		publish(eventName, message) {
			super.publish(eventName, message);
		};

		/**
		 *
		 * calls {@link PubSub.unsubscribe}
		 * @param eventName {string}
		 * @param callback {function} the callback function to be unsubscribed
		 */
		unsubscribe(eventName, callback) {
			super.unsubscribe(this.getModuleContainer(), eventName, callback);
		};


		/**
		 * This creates a new <i> div </i> element with the id same as the unique ID of the module. If compiledHTML is not provided, dom element is created progressively else page string is created.
		 * @param module module to be rendered
		 * @param compiledHTML {"string"|""}
		 * @returns {string|undefined}
		 */
		static createModuleArena(module, compiledHTML) {
			if (typeof compiledHTML !== "string") {
				document.querySelector(module.instanceConfig.container).innerHTML = `<div id="${module.getUniqueId()}"></div>`;
				return;
			}

			if (compiledHTML.trim() === "") {
				compiledHTML = `<div id="${module.getUniqueId()}"></div>`;
			} else {

			}

			return compiledHTML;
		}
	}

	return Module;
})();

export default Module
