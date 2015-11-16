var forms = require('../models/form.mock.json');
var q = require("q");

module.exports = function(app) {

    var api = {
        //form api
        findAllForms: findAllForms,
        findFormById : findFormById,
        findAllFormsForUser : findAllFormsForUser,
        createForm : createForm,
        updateForm : updateForm,
        deleteForm : deleteForm,

        // field api
        findAllFieldsForForm : findAllFieldsForForm,
        findFieldByFieldAndFormId : findFieldByFieldAndFormId,
        deleteFieldByFieldAndFormId : deleteFieldByFieldAndFormId,
        createNewFieldForForm : createNewFieldForForm,
        updateFieldByFieldAndFormId : updateFieldByFieldAndFormId
    };
    return api;

    function findFormById(formId) {
        var deferred = q.defer();
        for(var form in forms) {
            if(forms[form].id.localeCompare(formId) == 0) {
                deferred.resolve(forms[form]);
            }
        }
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        deferred.resolve(forms);
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {

        var deferred = q.defer();
        var userForms = [] ;
        for(var form in forms) {
            if(forms[form].userId == userId) {
                userForms.push(forms[form]);
            }
        }

        console.log(userForms);
        deferred.resolve(userForms);
        return deferred.promise;
    }

    function deleteForm(formId) {

        var deferred = q.defer();
        var userForms = [];
        var userId  = "0";
        console.log("starting for loop");
        for(var form in forms) {
            console.log(formId + " " + forms[form].id);
            if(forms[form].id.localeCompare(formId) == 0) {
                console.log(formId + " " + forms[form].userId);
                userId = forms[form].userId;
                forms.splice(form, 1);
                break;
            }
        }
        for(var form in forms) {
            if(forms[form].userId == userId) {
                userForms.push(forms[form]);
            }
        }
        deferred.resolve(userForms);
        return deferred.promise;
    }

    function createForm(newForm) {

        var deferred = q.defer();
        console.log(newForm);
        forms.push(newForm);
        deferred.resolve(newForm);
        return deferred.promise;
    }

    function updateForm(formId, updatedForm) {

        var deferred = q.defer();
        var userForms = [];
        var userId  = "0";
        for(var i = 0; i < forms.length; i++)  {
            console.log(forms[i].id);
            if(forms[i].id.localeCompare(formId) == 0) {
                forms[i].title = updatedForm.title;
                userId = forms[i].userId;
            }
        }

        for(var form in forms) {
            if(forms[form].userId == userId) {
                userForms.push(forms[form]);
            }
        }
        deferred.resolve(userForms);
        return deferred.promise;
    }

    function findAllFieldsForForm (formId) {
        var deferred = q.defer();
        console.log("inside forms model");
        var fieldsToReturn = [];
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                fieldsToReturn = forms[i].fields;
                break;
            }
        }
        console.log(fieldsToReturn);
        deferred.resolve(fieldsToReturn);
        return deferred.promise;
    }

    function findFieldByFieldAndFormId (formId, fieldId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId)
                        return fields[j];
                }
            }
        }
        return null;
    }

    function deleteFieldByFieldAndFormId (formId, fieldId) {
        console.log(formId + " " +fieldId);
        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId) {
                        console.log("inside if condition");
                        forms[i].fields.splice(j, 1);
                        break;
                    }
                }
            }
        }
        deferred.resolve(forms);
        return deferred.promise;
    }

    function createNewFieldForForm (formId, newField) {
        var deferred = q.defer();
        newField.id = guid();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms[i].fields.push(newField);
                break;
            }
        }
        deferred.resolve(forms);
        return deferred.promise;
    }

    function updateFieldByFieldAndFormId (formId, fieldId, updatedField) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId) {
                        forms[i].fields[j].id = updatedField.id;
                        forms[i].fields[j].label = updatedField.label;
                        forms[i].fields[j].type = updatedField.type;
                        forms[i].fields[j].placeholder = updatedField.placeholder;
                        break;
                    }
                }
            }
        }
        return forms[i];
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};