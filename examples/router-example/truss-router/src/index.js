import {Router5, loggerPlugin} from "router5";
import historyPlugin from "router5-history";
import linkInterceptor from "router5-link-interceptor";
import {createInstance, destroyModuleInstance} from "../../../../lib";

let Router,
	routesStore = {};


let addMethodsOnInstance = function (routeMap) {
	routesStore[routeMap.module.moduleName] = routeMap.module;


	routeMap["canActivate"] = function (toRoute) {
		return createInstance(routesStore[routeMap.module.moduleName]);
	};

	routeMap["canDeactivate"] = function (toRoute) {
		return destroyModuleInstance(routesStore[toRoute.name].moduleName);
	};
};

let iterateToAddMethodsOnInstance = function (routeMap) {

	if (Array.isArray(routeMap)) {
		routeMap.forEach((route)=> {
			addMethodsOnInstance(route);
		})
	} else {
		addMethodsOnInstance(routeMap);
	}
};


export default {
	configure: function (routeMap, config) {
		iterateToAddMethodsOnInstance(routeMap);

		// debugger;
		Router = new Router5(routeMap, config);

		if (config.logger) {
			Router.usePlugin(loggerPlugin());
		}

		if (config.history) {
			Router.usePlugin(historyPlugin());
		}
	},
	register: function (routeMap) {
		Router.add(routeMap);
	},
	setMiddleWare: function (middleware) {
		Router.usePlugin(middleware);
	},
	start: function () {
		Router.start();
	},
	go: function (state, data) {

	},
	intercept: function (interceptor) {

	}
};
