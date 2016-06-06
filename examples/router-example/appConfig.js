import RootModule from "./modules/app/layout";
import AboutModule from "./modules/app/about";
import ContactModule from "./modules/app/contact";
import CareerModule from "./modules/app/career";

export default [{
	name: 'layout',
	path: '/layout',
	module: {
		"moduleName": "layout",
		"instanceConfig": {
			"container": "#app-container",
			"placeholders": {
				"header": "Router",
				"aboutUs": "About Us",
				"aboutUsURL": "#/layout/about",
				"contactUs": "Contact Us",
				"contactUsURL": "#/layout/contact",
				"career": "Career",
				"careerURL": "#/layout/career"
			}
		},
		"module": RootModule
	}
},{
	name: 'layout.about',
	path: '/about',
	module: {
		"moduleName": "about",
		"instanceConfig": {
			"container": "#page-container",
			"placeholders": {}
		},
		"module": AboutModule
	}
},{
	name: 'layout.contact',
	path: '/contact',
	module: {
		"moduleName": "contact",
		"instanceConfig": {
			"container": "#page-container",
			"placeholders": {}
		},
		"module": ContactModule
	}
},{
	name: 'layout.career',
	path: '/career',
	module: {
		"moduleName": "career",
		"instanceConfig": {
			"container": "#page-container",
			"placeholders": {}
		},
		"module": CareerModule
	}
}];
