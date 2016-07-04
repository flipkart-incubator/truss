// A simple very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import Truss from "../../lib";
import RootInstance from "apps/layout";

import EventHandler from "./extensions/event-handler";
import ReduxHandler from "./extensions/redux-vdom";

Truss.use(EventHandler);
Truss.use(ReduxHandler);

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
