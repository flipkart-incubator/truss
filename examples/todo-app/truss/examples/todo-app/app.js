import Core from "framework/core.js";
import Root from "apps/root/rootConfig.js";

import {
    registerArr
} from "framework/router.js";

function asyncRequire(currentHash) {
    registerArr(Root.staticConfig.routeConfig);
    
    return new Promise((resolve, reject) => {        
        switch (currentHash.split("/")[0]) {
            case "form":
                require.ensure([], () => {
                    var config = require("apps/form/form_config.js").default;
                    var appConfig = config.dynamicConfig || config.staticConfig;
                    if (appConfig && typeof appConfig.then === "function") {
                        appConfig.then(function(fetchedConfig) {
                            registerArr(fetchedConfig);
                            resolve();
                        }, function(err) {
							console.error("Could not fetch config dynamically for Form");
							registerArr(config.staticConfig.routeConfig);
							resolve(err);
                        })
                    } else {
                        registerArr(appConfig.routeConfig);
                        resolve();
                    }
                }, "form");
                break;
            case "todos":
                require.ensure([], () => {
                    var config = require("apps/todos/todosConfig.js").default;
                    var appConfig = config.dynamicConfig || config.staticConfig;
                    if (appConfig && typeof appConfig.then === "function") {
                        appConfig.then(function(fetchedConfig) {
                            registerArr(fetchedConfig);
                            resolve();
                        }, function(err) {
                            console.error("Could not fetch config dynamically for Todos");
							registerArr(config.staticConfig.routeConfig);
							resolve(err);
                        })
                    } else {
                        registerArr(appConfig.routeConfig);
                        resolve();
                    }
                }, "Todos");
                break;
        }
    });
}
Core.loadApp(asyncRequire);