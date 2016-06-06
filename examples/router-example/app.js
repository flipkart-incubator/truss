// A simple 1very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import TrussRouter from "./truss-router/src";
import appConfig from "./appConfig";

TrussRouter.configure(appConfig, {
	useHash: true,
	hashPrefix: '',
	trailingSlash: true,
	logger: true,
	history: true,
	defaultRoute: 'layout'
});

TrussRouter.start();
