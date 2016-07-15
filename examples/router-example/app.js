// A simple 1very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import Truss from "../../lib";
import TrussRouter from "../../truss_router/lib";
import appConfig from "./routes";

import LifeCycleLogger from "./life-cycle-logger";
Truss.use(LifeCycleLogger);

TrussRouter.init(Truss);
TrussRouter.configure(appConfig, {
	useHash: true,
	hashPrefix: '',
	trailingSlash: true,
	logger: true,
	history: true,
	defaultRoute: 'layout'
});
TrussRouter.start();
