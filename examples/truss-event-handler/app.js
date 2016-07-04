// A simple very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import Truss from "../../lib";
import RootInstance from "apps/layout";

import EventHandler from "./extensions/event-handler";
Truss.use(EventHandler);

Truss.createInstance({
     "moduleName": "layout",
     "instanceConfig": {
         "container": "#app-container",
         "placeholders": {
             "header": "Vanilla Truss"
         }
     },
     "module": RootInstance
 });
