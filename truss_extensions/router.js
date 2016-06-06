import Core from "../lib";
import PubSub from "../lib/interfaces/pubsub"

import _ from "lodash";
import {Promise} from "es6-promise";
import Router from "./base-router.js";

var routeMap = {},
	stateMap = {},
	routeParams,
	currentRoute = {},
	alreadyRenderedStates = [],
	currentRequestId = 1,
	stateTransitionPromise = new Promise(function (resolve) {
		resolve();
	});

/*PubSub.subscribe({
	callback: function(asyncRequire) {
		configureV2(asyncRequire);
	},
	eventSubscriber: 'ROUTER',
	eventName: 'APP_LOADED'
});*/

function extractParams(path) {
	var params = [];
	path.replace(/[\-{}\[\]+?.,\\\^$|#\s]/g, '\\$&')
		.replace(/:\w+/g, function(match) {
			params.push(match.replace(":", ""));
		});
	return params;
}

function getStateParams(state) {
	var params = {};

	_.each(stateMap[state].routeParams, function(item) {
		params[item] = routeParams[item];
	});
	return params;
}

function areStateParamsSame(state, renderedState) {
	var areSame = true;

	_.each(stateMap[state].routeParams, function(value) {
		if(renderedState.routeParams[value] !== routeParams[value]) {
			areSame = false;
		}
	});

	return areSame;
}

function generateStates(state) {
	var i, actualStates = [],
		states = state && state.split("."),
		len = states.length;

	for(i = 0; i < len; i++) {
		if(actualStates.length === 0) {
			actualStates.push(states[i]);
		} else {
			actualStates.push([actualStates[i - 1], states[i]].join("."));
		}
	}
	return actualStates;
}

function calculateDeltaAndDestroyDiff(state) {
	var statesToBeRendered = generateStates(state),
		delta = [],
		parentInstanceId,
		index;

	for(index = 0; index < statesToBeRendered.length && index < alreadyRenderedStates.length; index++) {
		if(statesToBeRendered[index] === alreadyRenderedStates[index].state
			&& areStateParamsSame(statesToBeRendered[index], alreadyRenderedStates[index])) {
			console.log("Cached state -->" + statesToBeRendered[index]);
		} else {
			break;
		}
	}

	//All states are already rendered, might need to destroy few
	//Meaning 0 diff
	if(index === statesToBeRendered.length) {
		// Nothing to do here, just comments
	}
	//There are some states that needs to be rendered
	else {
		delta = statesToBeRendered.slice(index);
	}

	if(index < alreadyRenderedStates.length) {
		//Need to destroy few already rendered views
		Core.destroyModuleInstance(alreadyRenderedStates[index].instanceId);
		alreadyRenderedStates = alreadyRenderedStates.slice(0, index);
	}

	parentInstanceId = index > 0 ? alreadyRenderedStates[index - 1].instanceId : undefined;

	return {
		delta: delta,
		parentInstanceId: parentInstanceId
	};
}

function stateTransition(toState, requestId) {
	//Stop state transition if any other state transition is in progress
	stateTransitionPromise = stateTransitionPromise.then(function() {
		console.log('State transition for request id ' + requestId + " started.");
		return new Promise(function(resolve, reject) {

			var deltaFromCurrentPageState = calculateDeltaAndDestroyDiff(toState),
				parentInstanceId = deltaFromCurrentPageState.parentInstanceId,
				promise = new Promise(function (resolve) {
					resolve();
				});

			console.log(deltaFromCurrentPageState.delta);
			_.each(deltaFromCurrentPageState.delta, function (state, index) {
				promise = promise.then(function () {
					var moduleObj = stateMap[state].module,
						instanceConfig = stateMap[state].module.instanceConfig;

					console.log(moduleObj);


					Core.loadModule(moduleObj);
					return Core.createInstance(moduleObj, instanceConfig, parentInstanceId)
						.then(function (instanceId) {
							if (requestId === currentRequestId) {
								alreadyRenderedStates.push({
									state: state,
									routeParams: getStateParams(state),
									instanceId: instanceId
								});
							} else {
								// We have moved on to next request
								Core.destroyModuleInstance(instanceId);
								resolve();
								console.log('State transition for request id ' + requestId + " ended.");
							}

							parentInstanceId = instanceId;
						}, function () {
							console.error(arguments);
						});
				});
			});

			promise.then(function () {
				if (requestId === currentRequestId) {
					resolve();
					console.log('State transition for request id ' + requestId + " ended.");
					Core.publish('ROUTER', 'ROUTE_CHANGE_SUCCESSFUL', {
						state: toState
					});
				}
			});
		});
	});
}

function configureV2(asyncRequire){
	Router.init({
		preLoad : asyncRequire
	});
}

function registerArr(configArr) {
	_.forEach(configArr, function(item) {
		register(item);
	});
}

function configure(configArr) {
	registerArr(configArr);
	Router.init();
}

function register(config) {
	Router.register(config.path, callback, config.defaultPath);
	config.routeParams = extractParams(config.path);
	routeMap[config.path] = config;
	stateMap[config.state] = config;
}

function transition(path) {
	//hack for APP outage pages for DC, will solve it.
	showAppOutageIfEnabled(path);
}
function showAppOutageIfEnabled(path) {

	var state = routeMap[path] && routeMap[path]["state"],
		requestId = ++currentRequestId;
	currentRoute = stateMap[state];
	stateTransition(state, requestId);
}

function callback() {
	var context = arguments[0];
	routeParams = arguments[1];
	transition(context.path);
}

//added as a patch to update alreadyRenderedStates when frameLoader triggers a state change silently.
//Need to find a better way of handling this.
function updateRenderedState(state, updatedRouteParams){
	var stateToUpdate;

	stateToUpdate = alreadyRenderedStates[alreadyRenderedStates.length - 1];

	if(stateToUpdate){
		stateToUpdate.routeParams = updatedRouteParams;
		stateToUpdate.state = state;
	}
}

function go(state, params, toSuppressPageLoad) {
	debugger;
	var path = stateMap[state] && stateMap[state]["path"];
	_.forEach(params, function (value, key) {
		path = path.replace("/:" + key, "/" + value || "/undefined");
		path = path.replace("=:" + key, "=" + value || "=undefined");
	});

	Router.go(path, toSuppressPageLoad);

	if(toSuppressPageLoad){
		updateRenderedState(state, params);
	}
}

function getRouteParams() {
	return routeParams;
}

function navigate(url) {
	window.location.href = url;
}

export default {
	go: go,
	navigate: navigate,
	register: register,
	registerArr: registerArr,
	configure: configure,
	getRouteParams: getRouteParams,
	getCurrentState: function () {
		console.info("Router.getCurrentState will be deprecated. Kindly use Router.getCurrentRoute")
		return currentRoute;
	},
	getCurrentRoute: function () {
		return currentRoute;
	}
};



