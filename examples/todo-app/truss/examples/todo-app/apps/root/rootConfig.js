import RootCompositeInstance from "apps/root/rootComposite";

export default {
    staticConfig: {
        routeConfig: [{
            "appName": "root", // To determine the directory inside app 
            "path": "/root",
            "state": "root",
            "module": {
                "moduleName": "rootComposite",
                "instanceConfig": {
                    "container": "#app-container",
                    "placeholders": {}
                },
                "instance": RootCompositeInstance
            }
        }]
    }
};