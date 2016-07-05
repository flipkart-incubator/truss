import Truss from "../../lib";
import TrussRouter from "../../truss_router/lib";

import LayoutRoutes from "apps/layout/routes";
import AboutRoutes from "apps/about/routes";
import CareerRoutes from "apps/career/routes";
import ContactRoutes from "apps/contact/routes";

import EventHandler from "common/extensions/event-handler";
import ReduxHandler from "common/extensions/redux-vdom";


let routes = [].concat(LayoutRoutes, AboutRoutes, CareerRoutes, ContactRoutes);


TrussRouter.init(Truss);
Truss.use(EventHandler);
Truss.use(ReduxHandler);


TrussRouter.configure(routes, {
	useHash: true,
	hashPrefix: '',
	trailingSlash: true,
	logger: true,
	history: true,
	defaultRoute: 'layout'
});
TrussRouter.start();
