// An application which demonstrate usage of listensTo (to be used for interactions between modules)
// Configs: listensTo
// Usage:
//  listensTo: {
//      eventName: 'INIT_PAGINATION',
//      eventPublisher: '#app-container #content-container',
//      callback: 'methodName'
//  }
// In this example,
// header will have a button, on click of that timestamp should be added in content
// but context will be initialized after 6 secs of rendering header.

import Truss from "../../lib";
import RootInstance from "./modules/layout";

Truss.createInstance({
	"moduleName": "layout",
	"instanceConfig": {
		"container": "#app-container",
		"placeholders": {
			"header": "Vanilla Truss: listensTo hot"
		}
	},
	"module": RootInstance
});
