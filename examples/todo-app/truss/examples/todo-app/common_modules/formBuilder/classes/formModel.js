import UtilsHelper from "plugins/utils";
import PubSubHelper from "plugins/pubsub";

import text from '../templates/baseElementInput.html';
import numberT from '../templates/baseElementInput.html';
import range from '../templates/baseElementInput.html';
import date from  '../templates/baseElementInput.html';
import color from '../templates/baseElementInput.html';
import email from  '../templates/baseElementInput.html';
import tel from '../templates/baseElementInput.html';
import hidden from '../templates/baseElementInput.html';
import password from '../templates/baseElementInput.html';
import file from '../templates/baseElementInput.html';
import submit from '../templates/baseElementInput.html';
import reset from '../templates/baseElementInput.html';
import button from '../templates/baseElementInput.html';
import checkbox from '../templates/baseElementInput.html';
import radio from '../templates/baseElementInput.html';
import select from '../templates/baseElementSelect.html';
import textarea from '../templates/baseElementTextarea.html';
import moduleT from '../templates/baseCustomElement.html';

function FormModel() {
    if (FormModel.prototype._singletonInstance) {
        return FormModel.prototype._singletonInstance;
    }
    FormModel.prototype._singletonInstance = this;
    this.formData = {};
    this.validationError = false;
    this.dataStateStorage = 2;
}

FormModel.prototype = (function () {
    var CONST = {
        templatesMap: {
            text,
            "number": numberT,
            range,
            date,
            color,
            email,
            tel,
            hidden,
            password,
            file,
            submit,
            reset,
            button,
            checkbox,
            radio,
            select,
            textarea,
            "module": moduleT
        }
    };

    // latestLevel starts with 1.
    var getFormData = function (formName, latestLevel) {
        var formDataArr = this.formData[formName];

        if (!latestLevel || !((formDataArr.length - latestLevel) > -1)) {
            latestLevel = formDataArr.length - 1;
        }

        return formDataArr[latestLevel];
    };

    var setFormData = function (formName, data) {
        if (!this.formData[formName]) {
            this.formData[formName] = [];
        }

        if (this.formData[formName].length < this.dataStateStorage) {
            this.formData[formName].push(data);
        } else {
            this.formData[formName].shift();
            this.formData[formName].push(data);
        }

        if( data.formChangeEvent ){
            PubSubHelper.publish(null, data.formChangeEvent, {
                eleData: undefined,
                formData: data
            });
        }

        return getFormData.call(this, formName);
    };

    var getField = function (setArray, uqid) {
        var fieldIndex, fieldInSetIndex;

        function iterateInFields(fieldArr, fielduqid, setIndex) {
            fieldIndex = UtilsHelper.findIndex(fieldArr, function (field) {
                var uidData = fielduqid.split("--"),
                        uid = uidData[0]
                return field.uqid === uid;
            });
            fieldInSetIndex = setIndex;
        }

        function iterateInSets(setsArr, fielduqid, setIndex) {
            if (setsArr[setIndex] && setsArr[setIndex].fields) {
                iterateInFields(setsArr[setIndex].fields, fielduqid, setIndex);
            }

            if ((setIndex < setsArr.length) && ((fieldIndex === undefined) || (fieldIndex === -1))) {
                iterateInSets(setsArr, fielduqid, ++setIndex);
            }
        }

        iterateInSets(setArray, uqid, 0);

        return {
            setIndex: fieldInSetIndex,
            fieldIndex: fieldIndex
        }
    };

    var getFieldData = function (formName, uquid) {
        var formData = this.getFormData(formName),
            foundField,
            foundFieldDetails = getField(formData.sets, uquid);

        if (formData.sets.length > foundFieldDetails.setIndex) {

            //If field is present
            if (formData.sets[foundFieldDetails.setIndex].fields.length > foundFieldDetails.fieldIndex) {
                foundField = formData.sets[foundFieldDetails.setIndex].fields[foundFieldDetails.fieldIndex];
            }
        }
        return foundField;
    };

    var setFieldValue = function (fieldData, rerender, emitEvent) {

        if (!fieldData) {
            return;
        }

        var uidData = fieldData.uqid.split("--"),
            uid = uidData[0],
            index = uidData[1] || 0;

        var foundField = getFieldData.call(this, fieldData.formName, uid);
        var formData = getFormData.call(this, fieldData.formName);
        if (!foundField) {
            return;
        }

        if (fieldData.valueType === "element") {
            if (foundField.valueList) {
                if (foundField.type === "radio" || foundField.type === "checkbox") {
                    foundField.valueList.forEach(function (item) {
                        if (item.value == fieldData.value) {
                            item.selected = true;
                        } else {
                            item.selected = false;
                        }
                    });
                } else if (foundField.valueList.length > index) {
                    foundField.valueList[index].value = fieldData.value;
                } else {
                    foundField.valueList.push({value: fieldData.value});
                }
            } else {
                foundField.value = fieldData.value;
            }
        }

        if (fieldData.valueType === "qualifier") {
            if (foundField.valueList && foundField.valueList.length) {
                foundField.valueList[index].qualifier = fieldData.value;
            } else {
                foundField.valueList = [{
                    value: foundField.value || "",
                    qualifier: fieldData.value
                }];
                foundField.value = undefined;
            }
        }

        if (rerender) {
            PubSubHelper.publish('FORM_BUILDER', 'FIELD_UPDATED_' + formData.name, {
                eleData: foundField,
                formData: formData
            });
        }

        if( emitEvent ){
            PubSubHelper.publish('FORM_BUILDER', emitEvent, {
                eleData: foundField,
                formData: formData
            });
        }
    };

    var setFieldData = function (formName, uquid, overrideData, rerender, eventName) {

        // If object is provided
        if(typeof formName === "object"){
            uquid = formName.uqid;
            overrideData = formName.overrideData;
            rerender = formName.rerender;
            eventName = formName.eventName;
            formName = formName.formName;
        }

        if (typeof  overrideData === "string"){
            overrideData = {
                value: overrideData
            };
        }

        var formData = getFormData.call(this, formName);

        var foundData = getFieldData.call(this, formName, uquid);
        foundData = UtilsHelper.assign(foundData, overrideData);
        if (rerender) {
            PubSubHelper.publish('FORM_BUILDER', 'FIELD_UPDATED_' + formData.name, {
                eleData: foundData,
                formData: formData
            });
        }

        if( eventName ){
            PubSubHelper.publish('FORM_BUILDER', eventName, {
                eleData: foundData,
                formData: formData
            });
        }
    };

    function setValidationError(validationError){
        this.validationError = validationError;
    }

    function getValidationError(){
        return this.validationError;
    }

    return {
        setFormData: setFormData,
        getFormData: getFormData,
        constants: CONST,
        setFieldValue: setFieldValue,
        getFieldData: getFieldData,
        setFieldData: setFieldData,
        setValidationError: setValidationError,
        getValidationError: getValidationError
    };
})();

export default FormModel;
