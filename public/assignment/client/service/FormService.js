"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService () {
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }

        function findAllFormsForUser (userId, callback) {
            callback(forms);
        }

        function createFormForUser (userId, newForm, callback) {
            newForm.id = guid();
            newForm.userId = userId;
            callback(newForm);
        }

        function deleteFormById (formId, callback) {
            for(var i in forms) {
                if(forms[i].id == formId) {
                    forms.splice(i,1);
                }
            }
            callback(forms);
        }

        function updateFormById (formId, updatedForm, callback) {
            for(var i in forms) {
                if(forms[i].id == formId) {
                    forms[i] = updatedForm;
                }
            }
            callback(forms);
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

        return service;
    }
}) ();