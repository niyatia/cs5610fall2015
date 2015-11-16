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
        createNewFieldForForm : createNewFieldForForm
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

        deferred.resolve(userForms);
        return deferred.promise;
    }

    function deleteForm(formId) {

        var deferred = q.defer();
        var userForms = [];
        var userId  = "0";

        for(var form in forms) {
            if(forms[form].id.localeCompare(formId) == 0) {
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
        forms.push(newForm);
        deferred.resolve(newForm);
        return deferred.promise;
    }

    function updateForm(formId, updatedForm) {
        var deferred = q.defer();
        var userForms = [];
        var userId  = "0";
        for(var i = 0; i < forms.length; i++)  {

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

        var fieldsToReturn = [];
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                fieldsToReturn = forms[i].fields;
                break;
            }
        }

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

        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId) {
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