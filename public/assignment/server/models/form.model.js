var forms = require('../models/form.mock.json');
var q = require("q");

module.exports = function(app) {

    var api = {
        findAllForms: findAllForms,
        findFormById : findFormById,
        findAllFormsForUser : findAllFormsForUser,
        createForm : createForm,
        updateForm : updateForm,
        deleteForm : deleteForm
    };
    return api;

    function findFormById(formId) {
        var deferred = q.defer();
        for(var form in forms) {
            if(forms[form].id.localeCompare(formId) == 0) {
                console.log("Found form!");
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

    function updateForm(formId, formObj) {

        var deferred = q.defer();
        for(var i = 0; i < forms.length; i++)  {
            console.log(forms[i].id);
            if(forms[form].id.localeCompare(formId) == 0) {
                forms[i].username = formObj.username;
                forms[i].password = formObj.password;
                forms[i].firstName = formObj.firstName;
                forms[i].lastName = formObj.lastName;
                deferred.resolve(forms[i]);
            }
        }
        return deferred.promise;
    }
};