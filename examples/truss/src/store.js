let moduleS = Object.assign([], {
    getObjByPath: function (path) {
        let pointer;
        path.split(".").forEach((path) => {
            pointer = pointer || this;
            pointer = pointer[path];
        });
        return pointer;
    },

    insertInstance: function (instance, path) {
        let pointer;
        if (path) {
            pointer = this.getObjByPath(path);
        } else {
            pointer = this;
        }
        pointer.push(instance);
    },

    deleteInstance: function (path) {
        if (typeof path === "string") {
            let tPath = path.split(".");
            let key = tPath.splice(tPath.length - 1, 1);
            delete this.getObjByPath(tPath.join("."))[key];
        }
    },

    findInstance: function (path, searchKey, searchValue) {
        return this.filter(function (item) {
            if (path) {
                return item.path === path;
            } else if (searchValue && searchKey) {
                if (item[searchKey] === searchValue) {
                    return true;
                }
            }
        });
    },

    overrideInstance: function (path, searchKey, searchValue, overrideData, searchInAll) {
        let pointer;

        if (path) {
            pointer = this.getObjByPath(path);
        } else {
            pointer = this;
        }

        for (var key in overrideData) {
            pointer[key] = overrideData[key];
        }
    }
});

let isBrowser = typeof window !== "undefined";

let isServer = isBrowser;

let subscriptions = {};

export {
    isBrowser,
    subscriptions,
    moduleS,
    isServer
};