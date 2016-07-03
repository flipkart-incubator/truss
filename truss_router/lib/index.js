"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * This router extends the functionality of Router 5. Mostly the methods used in this router are simple wrapper around Router 5
                                                                                                                                                                                                                                                                   * @external http://router5.github.io/
                                                                                                                                                                                                                                                                   */


var _router = require("router5");

var _router5History = require("router5-history");

var _router5History2 = _interopRequireDefault(_router5History);

var _router5LinkInterceptor = require("router5-link-interceptor");

var _router5LinkInterceptor2 = _interopRequireDefault(_router5LinkInterceptor);

var _router5Listeners = require("router5-listeners");

var _router5Listeners2 = _interopRequireDefault(_router5Listeners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
var Router = new _router.Router5(),
    routesStore = {},
    lastState = void 0;
/**
 *
 * @param routeMap [object] of the format
 * {
 *      moduleConfig:Config object of the module
 *      name: name of the route
 *      path: path of the route
 * }
 * <p>If shouldRender method is present in the moduleConfig of the module then the method is called.
 * If the value returned is false then the rendering does not happen.
 * Should render is an optional parameter in module</p>
 *
 * <p>Similarly if shouldDestroy is present in the moduleConfig of the module then the method is called.
 * If the value returned is false then the module is not destryed on route change.</p>
 *
 */
var addMethodsOnInstance = function addMethodsOnInstance(routeMap, Truss) {

    routesStore[routeMap.moduleConfig.name] = routeMap.moduleConfig;

    routeMap["canActivate"] = function (toRoute, fromRoute, done) {

        if (Router.isActive(toRoute.name, toRoute.params, true, true)) {
            return true;
        }

        var moduleData = routesStore[routeMap.moduleConfig.name];

        lastState = toRoute;

        if (moduleData.module.shouldRender && moduleData.module.shouldRender(toRoute, fromRoute) || !moduleData.module.shouldRender) {
            return Truss.createInstance(moduleData);
        } else {
            done();
        }
    };

    Router.canDeactivate(routeMap.name, function (toRoute, fromRoute, done) {

        if (Router.isActive(toRoute.name, toRoute.params, true, true)) {
            return true;
        }

        var moduleData = routesStore[routeMap.moduleConfig.name];

        if (moduleData.module.shouldDestroy && moduleData.module.shouldDestroy(toRoute, fromRoute)) {
            Truss.destroyModuleInstance(moduleData);
        }

        moduleData.initialized = false;
        return true;
    });
};

/**
 * @param routeMap {Object|Array}. If array then iterates over routeMap to call {@link addMethodsOnInstance}
 */
var iterateToAddMethodsOnInstance = function iterateToAddMethodsOnInstance(routeMap, Truss) {

    if (Array.isArray(routeMap)) {
        routeMap.forEach(function (route) {
            route.moduleConfig.name = route.name;
            addMethodsOnInstance(route, Truss);
        });
    } else {
        addMethodsOnInstance(routeMap, Truss);
    }
};

exports.default = {
    /**
     *
     * @param routeMap [array] of objects in the format
     * {
     *      moduleConfig:Config object of the module
     *      name: name of the route
     *      path: path of the route
     * }
     * @param config [object] Router configuration . This method internally calls the Router.setOption method of Router 5
     */
    init: function init(Truss) {
        this.Truss = Truss;
    },
    configure: function configure(routeMap, config) {
        iterateToAddMethodsOnInstance(routeMap, this.Truss);
        Router.add(routeMap);

        for (var key in config) {
            Router.setOption(key, config[key]);
        }

        if (config.logger) {
            Router.usePlugin((0, _router.loggerPlugin)());
        }

        if (config.history) {
            Router.usePlugin((0, _router5History2.default)());
        }

        if (config.listener) {
            Router.usePlugin((0, _router5Listeners2.default)());
        }
    },
    /**
     * Method to register a route.
     * iterated through the map to create instances of modules then calls Router5.add
     * {@link external:http://router5.github.io/docs/api-reference.html}
     * @param routeMap
     */
    register: function register(routeMap) {
        iterateToAddMethodsOnInstance(routeMap, this.Truss);
        Router.add(routeMap);
    },
    /**
     * calls {@link register}
     * @param routeMap
     */
    reRegister: function reRegister(routeMap) {
        this.register(routeMap);
        Router.stop();
        Router.start();
    },
    /**
     * Wrapper around calls Router5.navigate
     * {@link external:http://router5.github.io/docs/api-reference.html}
     * @param state The route name
     * @param props [Object={}] [optional] The route params
     * @param force Route options
     * @param replace Route options
     */
    go: function go(state, props, force, replace) {
        var opts = {};

        if (force) {
            opts.reload = true;
        }

        if (replace) {
            opts.replace = true;
        }
        Router.navigate(state, props, opts);
    },
    /**
     * Wrapper around Router5.usePlugin
     * @param middleware
     */
    usePlugin: function usePlugin(middleware) {
        Router.usePlugin(middleware);
    },
    /**
     * Wrapper around Router5.useMiddleware
     * @param fn
     */
    useMiddleware: function useMiddleware(fn) {
        Router.useMiddleware(fn);
    },
    /**
     * Wrapper around Router5.start
     */
    start: function start() {
        Router.start();
    },
    /**
     * Wrapper around Router5.stop
     */
    stop: function stop() {
        Router.stop();
    },
    /**
     * returns the parameters of the current route
     * @returns {*}
     */
    getRouteParams: function getRouteParams() {
        return _extends({}, lastState.params);
    },
    /**
     * @returns {Router} Object
     */
    getRouter: function getRouter() {
        return Router;
    },
    /**
     * Returns the current route
     * @returns {*}
     */
    getCurrentRoute: function getCurrentRoute() {
        return lastState;
    },
    /**
     * changes the window url. uses window.location.href
     * @param url
     */
    navigate: function navigate(url) {
        window.location.href = url;
    },
    /**
     * router5-link-interceptor module
     */
    intercept: _router5LinkInterceptor2.default
};