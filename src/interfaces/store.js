/**
 * @module
 */
let moduleS = Object.assign([], {
	/**
	 * inserts the instance into the module store
	 * @param instance  of {@link Module}
	 * @param path {@todo reserved for future use}
	 */
    insertInstance: function (instance, path) {
        let pointer;
        if (path) {
            pointer = this.getObjByPath(path);
        } else {
            pointer = this;
        }
        pointer.push(instance);
    },

	/**
	 * deletes the instance of the module. Removes the entry from the module store
	 * instance  of {@link Module}
	 * @param name
	 */
    deleteInstance: function (name) {

        for (var i= this.length-1; i>=0; i--) {
            if (this[i].moduleName === name) {
                this.splice(i, 1);
                break;
            }
        }
    },

	/**
	 * Finds all the instances of the module from the module store
	 * @param name of the module to be searched
	 * @returns {Array} of all the instances of the module
	 */
    findInstance: function (name) {
        return this.filter(function (module) {
            if(module.moduleName === name){
                return module;
            }
        });
    },

	/**
	 * @param path
	 * @param searchKey
	 * @param searchValue
	 * @param overrideData
	 * @param searchInAll
	 */
    overrideInstance: function (path, searchKey, searchValue, overrideData, searchInAll) {
        let pointer;

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

/**
 * {@todo reserved for future use}
 * @type {boolean}
 */
let isBrowser = typeof window !== "undefined";

/**
 * {@todo reserved for future use}
 * @type {boolean}
 */
let isServer = !isBrowser;

/**
 * To be used by {@link pubsub}
 * {Object} List of all the subscriptions of all the events. Present in the format {"eventName": {subscription object}}
 */
let subscriptions = {};

/**
 *
 * @type {{store: Array}}
 */
let eventQ = {store: []};

export {
    isBrowser,
    subscriptions,
    moduleS,
    isServer,
    eventQ
};
