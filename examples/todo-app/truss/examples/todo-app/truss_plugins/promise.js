/**
 * Created by durgesh.priyaranjan on 21/05/15.
 */
import Core from "framework/core";
import {Promise} from "es6-promise";

var detectUncaughtPromise = function (promise, timeout, prevCaught) {
    var wrappedPromise = Object.create(promise);

    var chained = false;
    var stack = new Error().stack;

    wrappedPromise.then = function (onResolved, onRejected) {
        chained = true;
        var nextCaught = onRejected ? true : false;

        var newPromise = promise.then(onResolved, onRejected);
        return detectUncaughtPromise(newPromise, timeout, nextCaught);
    };

    wrappedPromise.catch = function (errHandler) {
        chained = true;

        var newPromise = promise.catch(errHandler);
        return detectUncaughtPromise(newPromise, timeout, true);
    };

    setTimeout(function () {
        if (chained) return;

        if (!prevCaught) {
            console.log('uncaught terminal promise detected.',
                'last then() was on:', stack)
        } else {
            promise.catch(function (err) {
                console.log('exception occured inside error handler',
                    'of last promise chain:', err)
            })
        }
    }, timeout);

    return wrappedPromise
};

var promise;
if (!Core.plugins.promise) {
    Core.plugins.promise = (function () {
        return {

            getPromise: function (callback) {
                var promise = new Promise(callback);
                return detectUncaughtPromise(promise, 1000);
            },

            all: function () {
                return Promise.all.apply(Promise, arguments);
            },
            race: function () {
                Promise.race.apply(Promise, arguments);
            },
            reject: function () {
                Promise.reject.apply(Promise, arguments);
            },
            resolve: function () {
                Promise.resolve.apply(Promise, arguments);
            }
        }
    })();
}

promise = Core.plugins.promise;

// Sandbox Extension
export default {
	getPromise: promise.getPromise,
	all: function () {
		return promise.all.apply(promise, arguments);
	},
	race: function () {
		promise.race.apply(promise, arguments);
	},
	reject: function () {
		promise.reject.apply(promise, arguments);
	},
	resolve: function () {
		promise.resolve.apply(promise, arguments);
	}
};
