/**
 * Created by durgesh.priyaranjan on 05/05/15.
 */
import __extends from "./extend";
import baseField from "./base";
import DomHelper from "plugins/dom";
import FormUtils from "./form-utils";
import FM from "./formModel";
import Model from "plugins/model";
import PromiseHelper from "plugins/promise";

var FormModel = new FM();

var InputType = (function (_super) {

    __extends(InputType, _super);

    function InputType(config, parent, globals) {
        this.parent = parent;
        this.globals = globals;
        _super.call(this, config, parent.deps);
    }

    InputType.prototype.getHTML = function () {
        var self = this;

        // TO get the value list count
        if (this.config && this.config.valueList) {
            this.config.valueListLengthOBase = this.config.valueList.length - 1;
        }

        if (!FormModel.constants.templatesMap[this.config.type]) {
            logit.warn("FORM_BUILDER: Invalid field type specified for:" + this.config.name);
            return;
        }

        return new Promise(function (resolve, reject) {
            var template= self.config.template || FormModel.constants.templatesMap[self.config.type];

                self.element = template(self.config);
                self.element = DomHelper.getDomNode(self.element);
                self.initializeDOM();
                resolve(self.element);
        });
    };

    return InputType;
})(baseField);

export default InputType;