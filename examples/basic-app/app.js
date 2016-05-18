// A simple very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import {createInstance} from "../truss/src";
import RootInstance from "./modules/layout";

 createInstance({
     "moduleName": "layout",
     "instanceConfig": {
         "container": "#app-container",
         "placeholders": {
             "header": "Vanilla Truss"
         }
     },
     "instance": RootInstance
 });