/**
 * Created by durgesh.priyaranjan on 05/05/15.
 */
import _ from "lodash";
import PromiseHelper from "es6-promise";
import jQuery from "jquery";

var utils = {
	find: _.find,
	debounce: _.debounce,
	filter: _.filter,
	flatten: _.flatten,
	union: _.union,
	groupBy: _.groupBy,
	reject: _.reject,
	each: _.each,
	pick: _.pick,
	map: _.map,
	throttle: _.throttle,
	pluck: _.pluck,
	reduce: _.reduce,
	zipObject: _.zipObject,
	findIndex: _.findIndex,
	indexOf: _.indexOf,
	contains: _.contains,
	curryRight: _.curryRight,
	object: _.object,
	values: _.values,
	length: _.size,
	assign: _.assign,
	compact: _.compact,
	uniq: _.uniq,
	clone: _.clone,
	cloneDeep: _.cloneDeep,
	remove: _.remove,
	param: jQuery.param,
	extend: _.extend,
	startsWith: function (needle, haystack) {
		var regEx,
			isStartsWith = false;

		if (!haystack || !needle) {
			return isStartsWith;
		}

		if (String.prototype.startsWith) {
			isStartsWith = haystack.startsWith(needle);
		} else {
			regEx = new RegExp('^' + needle);
			isStartsWith = regEx.test(haystack);
		}

		return isStartsWith;
	},

	endsWith: function (needle, haystack) {
		var regEx,
			isEndsWith;

		if (String.prototype.endsWith) {
			isEndsWith = haystack.endsWith(needle);
		} else {
			regEx = new RegExp(needle + "$");
			isEndsWith = regEx.test(haystack);
		}

		return isEndsWith;
	},

	stripHtmlTags: function (html) {
		var divEl;

		if (!html) {
			return null;
		}

		divEl = document.createElement("div").innerHTML = html;
		return divEl.textContent || divEl.innerText || html.replace(/(<([^>]+)>)/ig, "");
	},

    clearSlashes: function(string) {
		return _.trim(string, "/");
	},

	isNumeric: function (obj) {
		return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
	},

	isNumber: function () {
		throw new Error("notImplementedException");
	},

	isString: function (string) {
		return ((typeof string === "String") || (string instanceof String));
	},

	isFunction: function (object) {
		return (typeof object === "function");
	},

	isValidUrl: function (url) {
		return /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+)?(?::\d{1,5})?(?:[/?#]\S*)?$/i.test(url);
	},

	loadScript: function (src, isAsync) {
		var scriptEl,
			firstScriptEl;

		return PromiseHelper.getPromise(function (resolve, reject) {
			scriptEl = document.createElement('script');
			scriptEl.type = 'text/javascript';
			scriptEl.async = isAsync || false;
			scriptEl.src = src;

			scriptEl.onload = scriptEl.onreadystatechange = function () {
				if ((this.readyState) && (this.readyState != 'complete') && (this.readyState != 'loaded')) {
					return;
				}

				resolve();
			};

			scriptEl.onerror = function () {
				reject();
			};

			firstScriptEl = document.getElementsByTagName('script')[0];
			firstScriptEl.parentNode.insertBefore(scriptEl, firstScriptEl);
		});
	},
	intersection: _.intersection,
	includesState: function (needle, haystack) {
		var ishaveState = false;
		if (!haystack || !needle) {
			return ishaveState;
		}

		if (utils.startsWith(needle, haystack)) {
			if (haystack[needle.length] === '.' || haystack[needle.length] === undefined) {
				ishaveState = true;
			}
		}
		return ishaveState;
	}
};

export default {
	find: utils.find,
	debounce: utils.debounce,
	filter: utils.filter,
	flatten: utils.flatten,
	union: utils.union,
	groupBy: utils.groupBy,
	reject: utils.reject,
	each: utils.each,
	pick: utils.pick,
	assign: utils.assign,
	compact: utils.compact,
	uniq: utils.uniq,
	clone: utils.clone,
	cloneDeep: utils.cloneDeep,
	remove: utils.remove,
	isEmpty: utils.isEmpty,
	extend: utils.extend,
	map: utils.map,
	startsWith: utils.startsWith,
	endsWith: utils.endsWith,
	stripHtmlTags: utils.stripHtmlTags,
	clearSlashes: utils.clearSlashes,
	loadScript: utils.loadScript,
	throttle: utils.throttle,
	pluck: utils.pluck,
	reduce: utils.reduce,
	zipObject: utils.zipObject,
	object: utils.object,
	values: utils.values,
	length: utils.length,
	isNumber: utils.isNumber,
	isString: utils.isString,
	isFunction: utils.isFunction,
	isValidUrl: utils.isValidUrl,
	findIndex: utils.findIndex,
	indexOf: utils.indexOf,
	contains: utils.contains,
	isNumeric: utils.isNumeric,
	curryRight: utils.curryRight,
	intersection: _.intersection,
	includesState: utils.includesState,
	param: utils.param,
    getConfig: utils.getConfig
};
