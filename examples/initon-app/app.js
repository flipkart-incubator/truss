// An application which demonstrate usage of initOn (Dynamic way to initialize a module)
// Configs: initOn
// Usage:
//  initOn: {
//      eventName: 'INIT_PAGINATION',
//      eventPublisher: '#app-container #content-container'
//  }
// In this example,
// header will initialize content after 3 secs of render and
// footer will be initialized by content after 3 secs of render.
// Also, example of custom render call can be found in header and content.

import Truss from "../../lib";
import LayoutModule from "apps/layout";

Truss.createInstance({
	"moduleName": "layout",
	"instanceConfig": {
		"container": "#app-container",
		"placeholders": {
			"header": "Truss: initOn example"
		}
	},
	"module": LayoutModule
});
