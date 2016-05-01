import {Truss} from "truss";
import Layout from "modules/layout";

// Load truss app
Truss.createInstance({
	"moduleName": "layout",
	"instanceConfig": {
		"container": "#app-container",
		"placeholders": {
			"header": "Vanilla Truss"
		}
	},
	"instance": Layout
});