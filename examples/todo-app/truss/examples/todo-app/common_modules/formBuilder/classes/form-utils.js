/**
 * Created by durgesh.priyaranjan on 21/05/15.
 */

var getUid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};


var getTemplateDetails = function (templateName, currentModuleName) {

    var moduleName = currentModuleName,
        fullPath = false,
        templateDetail = templateName.split("/");

    if (templateDetail.length === 2) {
        moduleName = templateDetail[0];
        templateName = templateDetail[1];
    } else if (templateDetail.length > 2) {
        fullPath = true;
        moduleName = templateDetail[0];
        templateName = templateName;
    }

    return {
        fullPath: fullPath,
        moduleName: moduleName,
        templateName: templateName
    }
};


export default {
    getUid: getUid,
    getTemplateDetails: getTemplateDetails
};
