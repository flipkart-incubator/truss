/**
 * Created by puran.kanawat on 31/03/15.
 */
import Core from "framework/core";
import jQuery from "jquery";
import PromiseHelper from "es6-promise";
import UtilHelper from "plugins/utils";

var configuration;

function prepareRequest(config) {
	var promise = PromiseHelper.getPromise(function (resolve, reject) {

		function resolveRequest(data) {
			completed = true;
			resolve(data);
		}

		function rejectRequest(error) {
			completed = true;
			reject(error);
		}

		var params = {
				url: config.url,
				method: config.method || "GET",
				dataType: config.dataType || "json",
				data: config.params || {},
				headers: config.headers || {},
				contentType: config.contentType || undefined
			},
			handlers = {
				success: function (data, textStatus, jqXhr) {
					if (configuration && configuration.success) {
						configuration.success({
							statusCode: jqXhr.status,
							response: data,
							resolve: resolveRequest,
							reject: rejectRequest
						});
					}
					resolve(data);
				},
				error: function (jqXhr) {
					if (configuration && configuration.error) {
						configuration.error({
							statusCode: jqXhr.status,
							response: jqXhr.responseJSON || jqXhr.responseText,
							resolve: resolveRequest,
							reject: rejectRequest
						});
					}
					reject(jqXhr.responseJSON || jqXhr.responseText);
				},
				complete: function (jqXhr) {
					if (configuration && configuration.complete) {
						configuration.complete({
							statusCode: jqXhr.status,
							response: jqXhr.responseJSON || jqXhr.responseText,
							resolve: resolveRequest,
							reject: rejectRequest
						});
					}
					config.canceller && config.canceller.resolve();
				}
			},
			completed = false,
			xhr;

		if (configuration && configuration.start) {
			configuration.start({
				params: params,
				resolve: resolveRequest,
				reject: rejectRequest
			});
		}

		if (params.contentType && (params.contentType.indexOf('application/json') >= -1)) {
			try {
				params.data = JSON.stringify(params.data);
			}
			catch (e) {
				console.error("contentType for ajax call set to application/json but the content is not json");
			}
		}

		if (!completed) {
			xhr = jQuery.ajax(UtilHelper.extend(params, handlers));
			if (config.canceller) {
				config.canceller.promise.then(function () {
					},
					function () {
						xhr.abort();
					});
			}
		}
		else {
			config.canceller && config.canceller.resolve();
		}
	});

	return promise;
}

function getJSON(url, params, options) {
	options = options || {};
	options = _.extend(options, {
		url: url,
		method: "GET",
		params: params
	});
	return prepareRequest(options);
}

function postJSON(url, params, options) {
	options = options || {};
	options = _.extend(options, {
		url: url,
		method: "POST",
		params: params
	});
	return prepareRequest(options);
}

function putJSON(url, params, options) {
	options = options || {};
	options = _.extend(options, {
		url: url,
		method: "PUT",
		params: params
	});
	return prepareRequest(options);
}

function deleteJSON(url, params, options) {
	options = options || {};
	options = _.extend(options, {
		url: url,
		method: "DELETE",
		params: params
	});
	return prepareRequest(options);
}

function ajax(config) {
	return prepareRequest(config);
}

function getQueryStringForObject(o) {
	if (o) {
		return jQuery.param(o);
	}
	else {
		return '';
	}
}

function configure(config) {
	configuration = config;
}

export default {
	getJSON: getJSON,
	postJSON: postJSON,
	ajax: ajax,
	putJSON: putJSON,
	deleteJSON: deleteJSON,
	getQueryStringForObject: getQueryStringForObject,
	configure: configure
};

