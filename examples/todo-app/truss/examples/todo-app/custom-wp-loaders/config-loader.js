require('es6-promise').polyfill();
require('isomorphic-fetch');
var path = require('path');

var beautify = require('js-beautify').js_beautify;
var fs = require("fs");
var appJSString = "";

// Template for app.js
var appTemplate = (hashConditions) => {
	return (`
    import Core from "framework/core.js";
    import {registerArr} from "framework/plugins/router.js";

    function asyncRequire(currentHash){
        return new Promise((resolve, reject) => {
            switch (currentHash.split("/")[0]) {
            ${hashConditions}
            }
        });
    }
    Core.loadApp(asyncRequire);`);
};

var caseTemplate = (appConfig) => {
	return (`case "${appConfig.hash}":
    require.ensure([], () => {
        var config = require("apps/${appConfig.appName}/${appConfig.appName}Config.js").default;
        var appConfig = config.dynamicConfig || config.staticConfig;
        if(appConfig && typeof appConfig.then === "function"){
            appConfig.then(function(fetchedConfig){
                registerArr(fetchedConfig);
                resolve();
            }, function(err){
                console.error("Could not fetch config dynamically for ${appConfig.appName}");
                reject(err);
            })
        } else {
            registerArr(appConfig.routeConfig);
            resolve();
        }
    },"${appConfig.appName}");
    break;`);
};

var appConfigTemplate = (configs, appName) => {

	var importString = 'let moduleRef = {}; import Request from "plugins/request";', fileContent;

	configs.forEach((config) => {
		if (config.module && config.module.moduleName) {
			importString += "import " + config.module.moduleName + "Instance from " + '"' + "apps/" + appName + "/" + config.module.moduleName + '";';
			importString += `moduleRef.${config.module.moduleName} = ${config.module.moduleName}Instance;`;
			config.module.instance = "t2-" + config.module.moduleName + "Instance" + "-t2";
		}
	});

	fileContent = beautify(`
        ${importString}
        export default {
            staticConfig: {
                routeConfig: ${JSON.stringify(configs)}
            },
            dynamicConfig: new Promise( (resolve, reject) => {
                Request.ajax({
                    url: "//demo5444001.mockable.io/appConfig/${appName}"
                })
                .then(function(data){
                    data.forEach((routeConfig) => {
                        routeConfig.module.instance = moduleRef[routeConfig.module.moduleName];
                    });
                    resolve(data);
                },function(err){
                    reject(err)
                });
            })
        };`
		, {indent_size: 4});
	fileContent = fileContent.replace(/"t2-/g, '').replace(/-t2"/g, '');

	return fileContent;
};


// Create config files
var createConfigFiles = function (configs) {
	configs.forEach((appConfig, index)=> {
		var rootConfig = appConfig.filter((config) => {
			return config.appName && config.hash;
		})[0];
		appJSString += caseTemplate(rootConfig);
		console.log(path.resolve("../apps/" + rootConfig.appName + '/' + rootConfig.appName + "Config.js"));
		fs.writeFileSync("../apps/" + rootConfig.appName + '/' + rootConfig.appName + "Config.js", appConfigTemplate(appConfig, rootConfig.appName), 'utf8');
	});

	appJSString = appTemplate(appJSString);
	appJSString = beautify(appJSString, {indent_size: 4});
	fs.writeFileSync("./app.js", appJSString, 'utf8');
	appJSString = "";
};


// Create app.js with
((function (source) {
	fetch('//demo5444001.mockable.io/appConfig')
		.then(function (response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function (configs) {
			createConfigFiles(configs);
			callback(null, source);
		})
		.catch(function (err) {
			throw new Error(err);
		});
})());
