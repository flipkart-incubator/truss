import Core from "framework/core";

export default {
    createInstance: function (moduleName, instanceConfig, parentInstanceId) {
        return Core.createInstance(moduleName, instanceConfig, parentInstanceId);
    },
    loadModule: function (moduleName) {
        return Core.loadModule(moduleName);
    },
    destroyInstance: function(moduleInstanceId) {
        Core.destroyModuleInstance(moduleInstanceId);
    }
};
