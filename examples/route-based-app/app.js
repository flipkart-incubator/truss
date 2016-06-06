// A simple very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import {createInstance} from "../../lib";
import RootInstance from "./modules/layout";

import Router5, { loggerPlugin } from 'router5';
import listenersPlugin from 'router5-listeners';
import historyPlugin from 'router5-history';
import routes from './routes/routes';

const router = new Router5(routes)
	.setOption('useHash', true)
	.setOption('defaultRoute', 'contacts')
	// Plugins
	.usePlugin(loggerPlugin())
	.usePlugin(listenersPlugin())
	.usePlugin(historyPlugin());

router.addListener(function (toState, fromState) {
	alert('You have navigated to some');
});
router.addRouteListener('', function (toState, fromState) {
	alert('You have navigated to inbox.message');
});
router.addRouteListener('inbox', function (toState, fromState) {
	alert('You have navigated to inbox');
});

router.start(() => {
	createInstance({
		"moduleName": "layout",
		"instanceConfig": {
			"container": "#app-container",
			"placeholders": {
				"header": "Route Based Truss App"
			}
		},
		"instance": RootInstance
	});
});

setTimeout(
	()=>{
		debugger;
		//router.navigate("inbox.message", {id:1})
	}, 3000);

 /*createInstance({
     "moduleName": "layout",
     "instanceConfig": {
         "container": "#app-container",
         "placeholders": {
             "header": "Route Based Truss App"
         }
     },
     "instance": RootInstance
 });*/

