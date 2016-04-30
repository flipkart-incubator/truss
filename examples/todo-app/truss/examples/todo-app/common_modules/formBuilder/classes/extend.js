/**
 * Created by durgesh.priyaranjan on 05/05/15.
 */
// To extend one instance from another.
var __extends = (this && this.__extends) || function (childInstance, parentInstance) {

        for (var property in parentInstance) {
            if (parentInstance.hasOwnProperty(property)) {
                childInstance[property] = parentInstance[property];
            }
        }

        function __() {
            this.constructor = childInstance;
        }

        __.prototype = parentInstance.prototype;
        childInstance.prototype = new __();
    };

export default __extends;
