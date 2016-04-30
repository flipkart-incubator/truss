import utils from "../lib/utils";
import urlHelper from "./urlHelper.js";


function SimpleRouter() {
	this.routes = [];
	this.mode = null;
	this.root = '/';
};

SimpleRouter.prototype = (function() {
	return {
		constructor: SimpleRouter,

		config: function(options) {
			this.mode = options && options.mode && options.mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
			this.root = options && options.root ? '/' + utils.clearSlashes(options.root) + '/' : '/';
            this.preLoad = options.preLoad;

			return this;
		},

		getFragment: function() {
			var match,
				fragment = '';

			if(this.mode === 'history') {
				fragment = utils.clearSlashes(decodeURI(location.pathname + location.search));
				fragment = fragment.replace(/\?(.*)$/, '');
				fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
			} else {
				match = window.location.href.match(/#(.*)$/);
				fragment = match ? match[1] : '';
			}

			return utils.clearSlashes(fragment);
		},

		parseRoute: function(path) {
			var namedParams = [],
				namedParam = /:\w+/g,
				escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

			path = path
				.replace(escapeRegExp, '\\$&')
				.replace(namedParam, function(match) {
					namedParams.push(match.replace(":", ""));
					return '([^\/]+)';
				});

			return {
				routeRegEx: new RegExp('^' + path + '$'),
				params: namedParams
			};
		},

		extractParameters: function(route, fragment) {
			var routeParams = {},
				routeKeys = route.routeParams,
				paramValues = route.regEx.exec(fragment).slice(1);

			paramValues.forEach(function(param, index) {
				routeParams[routeKeys[index]] = param ? decodeURIComponent(param) : null;
			});
			return routeParams;
		},

		add: function(config) {
			var parsedRoute = this.parseRoute(config.path);
			this.routes.push({
				regEx: parsedRoute.routeRegEx,
				routeParams: parsedRoute.params,
				path: config.path,
				defaultPath: config.defaultPath,
				handler: config.handler
			});
			return this;
		},

		remove: function(param) {
			for(var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
				if(r.handler === param || r.path.toString() === param.toString()) {
					this.routes.splice(i, 1);
					return this;
				}
			}

			return this;
		},

		flush: function() {
			this.routes = [];
			this.mode = null;
			this.root = '/';

			return this;
		},

		checkUrl: function() {
			var current = this.getFragment();

			if(current === this.fragment) {
				return false;
			}

			this.loadUrl();
		},

		loadUrl: function() {
			var self = this,
				hasMatched,
				defaultPath,
				routeParams,
				fragment = this.fragment = this.getFragment();

            if (self.preLoad) {
                self.preLoad(fragment).then(() => {
                    hasMatched = self.routes.some(function(route) {
                        if(route.regEx.test(fragment)) {
                            routeParams = self.extractParameters(route, fragment);
                            route.handler.apply(route, [route, routeParams]);

                            return true;
                        }

                        if(route.defaultPath) {
                            defaultPath = route.path;
                        }
                    });
                    if(!hasMatched && defaultPath) {
                        this.go(defaultPath);
                    }
                });
            }
		},

		listen: function() {
			var self = this;
			if(this.mode === "history") {
				window.onpopstate = self.checkUrl.bind(self);
			} else {
				window.onhashchange = self.checkUrl.bind(self);
			}

			this.loadUrl();
		},

		stop: function() {
            debugger;
			var self = this;
            window.onpopstate = undefined;
            window.onhashchange = undefined;
		},

		go: function(path, toSuppressPageLoad) {
			var targetUrl,
				self = this;

			path = path ? path : '';
			toSuppressPageLoad = !!toSuppressPageLoad;

			if(this.mode === 'history') {
				history.pushState(null, null, this.root + utils.clearSlashes(path));
			} else {
				targetUrl = urlHelper.setHash(path, window.location.href);

				if(toSuppressPageLoad) {
					history.replaceState(null, null, targetUrl);
					self.fragment = self.getFragment();
				} else {
					window.location.href = targetUrl;
				}
			}

			return this;
		}
	}
})();

var router = new SimpleRouter();

export default {
	init: function(options) {
		router.config(options);
		router.listen();
	},
	register: function(path, fn, defaultPath) {
		router.add({
			path: path,
			defaultPath: defaultPath,
			handler: fn
		});
	},
	go: function(path, toSuppressPageLoad) {
		router.go(path, toSuppressPageLoad);
	}
};
