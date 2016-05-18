// FEATURES TO BE ADDED
//Server rendering
//replayEvent
//listensTo
//resolveRenderOn
//onRenderComplete
//initOn: Done

import {Promise} from "es6-promise";
import Utils from "./helpers/utils";
import Base from "./base.js";
import {_createModuleArena} from "./base.js";
import {moduleS, subscriptions, isBrowser} from "./store";

// STEP:1
let _lockEvents = function (module, compiledHTML) {

    module.listensTo && module.listensTo.length && module.listensTo.forEach((listener) => {
        module.subscribe({
            eventName: listener.eventName,
            callback: module[listener.callback],
            context: module,
            eventPublisher: listener.eventPublisher,
            once: listener.once
        });
    });

    return _listenForInitOn(module, compiledHTML);    
};

// STEP:2
let _listenForInitOn = function (module, compiledHTML) {

    if (module.initOn) {
        return Promise.resolve(module.path);
    } else {
        return _callResolveRenderOn(module, compiledHTML);
    }
};

// STEP:3
let _callResolveRenderOn = function (module, compiledHTML) {
    // console.log("_callResolveRenderOn called for: " + module.moduleName);
    // console.log(module);
    // console.log("-------------");
    return _callRender(module, compiledHTML);
};

// STEP:4
let _callRender = function (module, compiledHTML) {
    // if initOn is present exec below steps on initOn
    // exec resolveRenderOn (if available)
    // exec render after resolveRenderOn completes
    // throw error is render and template are not provided
    console.log("_callRender called for: " + module.moduleName);
    _createModuleArena(module, compiledHTML);
    return new Promise((res, rej) => {
        // Null to be replaced with resolveRenderOn data

        compiledHTML = module.render(null, compiledHTML);
        res(module.path, compiledHTML);
    });
};

let _startExec = function (rootModules) {
    let compiledHTML;
    if (!rootModules) {
        rootModules = moduleS.filter((module) => {
            return module.path.split(".").length === 1;
        });

        if (isBrowser) { compiledHTML = undefined; }
    }

    rootModules.forEach((rootModule) => {
        // Render this module
        _lockEvents(rootModule, compiledHTML)
            .then((resolvedPath) => {
                // Get module level
                let level = Utils.getLevelsFromPath(rootModule.path);

                // Find next level children
                let childModules = moduleS.filter((module) => {
                    return (module.path.indexOf(`${resolvedPath}.`) > -1) && (Utils.getLevelsFromPath(module.path) === (level + 1));
                });

                // _startExec all next level children                    
                _startExec(childModules);
            });
    });
};

let _registerSubscription = function (module) {
    if (module.initOn) {
        module.subscribe({
            eventName: module.initOn.eventName,
            eventPublisher: module.initOn.eventPublisher,
            context: module,
            callback: Utils.partial(_callResolveRenderOn, module)
        });

        return Promise.resolve(module.path);
    }

    // Listensto to be added
    //if()
};

let _registerModule = function(config, moduleName = config.moduleName, instance = config.instance, instanceConfig = config.instanceConfig, path = ""){
    //If root module
    if(!path){
        path = moduleName;
        // Check if its already present in registered module.
        // If it is, give warning.
        // TODO: Add support to override config
        if (moduleS.findInstance(null, "moduleName", moduleName).length > 0){
            console.warning(`Module (${moduleName}) is already registered at same path. Skipping...`);
            return;
        }
    }

    //If child modules
    if(path){
        // Check if its already present in registered module.
        // If it is, give warning.
        if (moduleS.findInstance(path).length > 0){
            console.warning(`Module (${moduleName}) is already registered at same path. Skipping...`);
            return;
        }
    }

    let moduleDetail = Object.assign(
        {},
        { moduleName },
        Base,
        instance,
        { uniqueId: Utils.getNextUniqueId() },
        { path },
        {
            lifeStage: {
                initiated: true,
                eventLocked: false,
                renderDependencyCalled: false,
                renderCalled: false,
                postRenderCalled: false
            }
        },
        instanceConfig
    );

    // Store module
    moduleS.insertInstance(moduleDetail);
    _registerSubscription(moduleDetail);

    // Has child modules
    if(instance.config && instance.config.modules && instance.config.modules.length){
        instance.config.modules.forEach((childModule) => {
            _registerModule(childModule, undefined, undefined, undefined, `${path}.${childModule.moduleName}`);
        });
    }
};

export function createInstance (config) {
    _registerModule(config, config.moduleName, config.instance, config.instanceConfig);
    _startExec();
}
