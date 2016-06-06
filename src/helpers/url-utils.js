/**
 * Created by puran.kanawat on 05/06/16.
 */
export default {
	parseUrl: function(url) {
		var a = document.createElement('a'),
			protocol,
			hostname,
			port;

		a.href = url;

		protocol = a.protocol || location.protocol;
		hostname = a.hostname || location.hostname;
		port = a.port || location.port;

		return {
			source: url,
			protocol: protocol.replace(':', ''),
			host: hostname,
			port: port,
			query: a.search,
			hash: a.hash.replace('#', ''),
			path: a.pathname.replace(/^([^/])/, '/$1'),
			segments: a.pathname.replace(/^\//, '').split('/'),
			params: (function() {
				var params = {},
					paramKeyValue,
					paramsKeyValue,
					paramsLength,
					paramIndex;

				paramsKeyValue = a.search.replace(/^.*\?/, '').split('&');
				paramsLength = paramsKeyValue.length;

				for(paramIndex = 0; paramIndex < paramsLength; paramIndex++) {
					if(!paramsKeyValue[paramIndex]) {
						continue;
					}

					paramKeyValue = paramsKeyValue[paramIndex].split('=');
					params[paramKeyValue[0]] = paramKeyValue[1];
				}

				return params;
			})()
		};
	},

	getUrl: function(thisWindow) {
		thisWindow = thisWindow || window;

		return thisWindow.location.href;
	},

	buildUrl: function(oUrl, isRelative) {
		var oThis = this,
			query = [],
			urlSegments = [];

		if(utils.isString(oUrl)) {
			oUrl = oThis.parseUrl(oUrl);
		}

		_.forEach(oUrl.params, function(value, key) {
			query.push(key + "=" + value);
		});

		if(!isRelative) {
			urlSegments.push(oUrl.protocol, "://", oUrl.host, ":", oUrl.port);
		}

		urlSegments.push(oUrl.path);

		if(query.length) {
			urlSegments.push("?", query.join("&"));
		}

		if(oUrl.hash) {
			urlSegments.push("#", oUrl.hash);
		}

		return urlSegments.join("");
	},

	setUrl: function(url, toSuppressReload) {
		var isUrlSet = false;

		if(url) {
			if(toSuppressReload) {
				location.replace(url);
			} else {
				location.href = url;
			}
			isUrlSet = true;
		}

		return isUrlSet;
	},

	getParams: function(url) {
		var oThis = this,
			url = url || oThis.getUrl(),
			oUrl = oThis.parseUrl(url);

		return oUrl.params;
	},

	getParam: function(param, url) {
		var oThis = this,
			url = url || oThis.getUrl(),
			urlParam,
			urlParams = oThis.getParams(url);

		if(utils.length(urlParams)) {
			urlParam = urlParams[param];
		}

		return urlParam;
	},

	removeParam: function(param, url) {
		var oThis = this,
			url = url || oThis.getUrl(),
			oUrl = oThis.parseUrl();

		delete oUrl["params"][param];

		return oThis.buildUrl(oUrl);
	},

	setParam: function(param, value, url) {
		var oThis = this,
			urlParams,
			oUrl;

		url = url || oThis.getUrl();
		oUrl = oThis.parseUrl(url);
		urlParams = oUrl.params;
		urlParams[param] = value;

		return oThis.buildUrl(oUrl);
	},

	getHash: function(url) {
		var oThis = this,
			url = url || oThis.getUrl(),
			oUrl = oThis.parseUrl(url);

		return oUrl.hash;
	},

	setHash: function(hash, url) {
		var oThis = this,
			url = url || oThis.getUrl(),
			oUrl = oThis.parseUrl(url);

		oUrl.hash = hash;
		return oThis.buildUrl(oUrl);
	}
}
