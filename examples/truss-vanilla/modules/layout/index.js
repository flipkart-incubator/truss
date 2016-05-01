import template from "./template.html";
import "./style.less";

import headerModuleInstance from "modules/head";
import contentModuleInstance from "modules/content";
import footerModuleInstance from "modules/footer";

export default {
    template,
	config: {
        modules: [{
            "moduleName": "headerModule",
            "instanceConfig": {
                "container": "#header-container",
                "placeholders": {}
            },
            "instance": headerModuleInstance
        },{
            "moduleName": "contentModule",
            "instanceConfig": {
                "container": "#content-container",
                "placeholders": {}
            },
            "instance": contentModuleInstance
        },{
            "moduleName": "footerModule",
            "instanceConfig": {
                "container": "#footer-container",
                "placeholders": {}
            },
            "instance": footerModuleInstance
        }]
    }
};