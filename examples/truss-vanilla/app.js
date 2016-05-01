import Truss from "Truss";
import Layout from "apps/layout";


// Load truss app
Truss.createInstance({
	moduleName: "layout",
	"instanceConfig": {
		"container": "#app-container",
			"placeholders": {}
	},
	"instance": Layout
});
