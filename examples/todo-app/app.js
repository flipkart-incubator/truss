import {Truss} from "./truss/src";

import RootInstance from "modules/layout";

Truss.createInstance({
    "moduleName": "layout",
    "instanceConfig": {
        "container": "#app-container",
        "placeholders": {
            "header": "Vanilla Truss"
        }
    },
    "instance": RootInstance
});