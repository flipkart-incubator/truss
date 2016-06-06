/**
 * Created by puran.kanawat on 04/06/16.
 */


import RootInstance from "../modules/layout";

export default [
	{
		state: 'layout',
		path: '/layout',
		defaultPath: true,
		module: {
			"moduleName": "layout",
			"instanceConfig": {
				"container": "#app-container",
				"placeholders": {
					"header": "Route Based Truss App"
				}
			},
			"instance": RootInstance
		}
	}
];
