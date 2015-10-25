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

        function createFormForUser (userId, newForm, callback) {
            newForm.id = guid();
            newForm.userId = userId;
            forms.push(newForm);

            callback(newForm);
        }

        function findAllFormsForUser (userId, callback) {

            var userForms = [];

            for(var i in forms) {
                if(forms[i].userId == userId) {
                    userForms.push(forms[i]);
                }
            }

            callback(userForms);
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
                    forms.splice(i,1);
                    updatedForm.id = formId;
                    forms.push(updatedForm);
                }
            }

            callback(updatedForm);
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