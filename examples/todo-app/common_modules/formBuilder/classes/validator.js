import PromiseHelper from 'plugins/promise';

export default {
    validateIsRequired: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (!value) {
            valObj.isValid = false;
            valObj.errMsg = message || "required field";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsSpaceNotAllowed: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (!value.trim()) {
            valObj.isValid = false;
            valObj.errMsg = message || "Empty spaces not allowed";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsPositiveNumber: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        }, regex = /^[0-9]*$/;
        if (!value.match(regex)) {
            valObj.isValid = false;
            valObj.errMsg = message || "invalid value";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsZero: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (value == 0) {
            valObj.isValid = false;
            valObj.errMsg = message || "can not be zero";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsPan: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (!value.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)) {
            valObj.isValid = false;
            valObj.errMsg = message || "not a valid PAN";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsTan: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        }, regex = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z])$/;
        if (!value.match(regex)  && value != 'Not Available') {
            valObj.isValid = false;
            valObj.errMsg = message || "not a valid TAN";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsTin: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (!value.match(/^[0-9]{11}[cCvVsS]?$|^[0-9]{9}[cCvV][cCvV]?$/) && value != 'Not Available') {
            valObj.isValid = false;
            valObj.errMsg = message || "not a valid VAT/TIN";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsCin: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (!value.match(/^[a-zA-Z0-9]{21}?$/) && value != 'Not Available') {
            valObj.isValid = false;
            valObj.errMsg = message || "not a valid CIN";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsAlphaNumeric: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (!value.match(/^[0-9a-zA-Z\s]*$/)) {
            valObj.isValid = false;
            valObj.errMsg = message || "accepts only alpha numeric characters";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsAlpha: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (!value.match(/^[a-zA-Z\s]*$/)) {
            valObj.isValid = false;
            valObj.errMsg = message || "accepts only alphabets";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsIFSC: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };
        if (!value.match(/^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/)) {
            valObj.isValid = false;
            valObj.errMsg = message || "Please enter a valid IFSC code";
        }
        return PromiseHelper.getPromise(function (resolve, reject) {
            resolve(valObj);
        })
    },
    validateIsEmail: function (value, message) {
        var valObj = {
            isValid: true,
            errMsg: ''
        };

        return PromiseHelper.getPromise(function (resolve, reject) {
            if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                valObj.isValid = false;
                valObj.errMsg = message || "not a valid email id";
                resolve(valObj);
            } else {
                resolve(valObj);
            }
        })
    }
}