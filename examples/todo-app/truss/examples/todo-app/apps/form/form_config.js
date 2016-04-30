import form_compositeInstance from "apps/form/form_composite";

export default {
    staticConfig: {
        routeConfig: [{
            "appName": "form",
            "path": "form",
            "state": "root.form",
            "module": {
                "moduleName": "form_composite",
                "instanceConfig": {
                    "container": "#content-container",
                    "placeholders": {}
                },
                "instance": form_compositeInstance
            }
        }]
    }
};