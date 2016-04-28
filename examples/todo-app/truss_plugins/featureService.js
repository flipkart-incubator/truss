/**
 * Created by puran.kanawat on 13/09/15.
 */
import RequestHelper from "./request";
import PromiseHelper from "./promise";
import urlHelper from "./urlHelper";

var config;

function fetchConfig() {
	var url = urlHelper.setParam("sellerId", urlHelper.getParam("sellerId"), "getFeaturesForSeller");
	return RequestHelper.getJSON(url).then(function (data) {
		config = data;
	});
}

function resolve(o) {
	return PromiseHelper.getPromise(function (resolve, reject) {
		if (config) {
			config[o] !== true ? resolve() : reject();
		} else {
			fetchConfig().then(function () {
				config[o] !== true ? resolve() : reject();
			});
		}
	});
}

fetchConfig();

export default {
	fetchConfig: fetchConfig,
	resolve: resolve
};


