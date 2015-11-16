"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService ($http, $q) {

        var api = {
            getFieldsForForm : getFieldsForForm,
            createNewFieldForForm  : createNewFieldForForm ,
            deleteFieldFromForm : deleteFieldFromForm
        };
        return api;

        function getFieldsForForm (formId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createNewFieldForForm  (formId, newField) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/form/" + formId + "/field", newField)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFieldFromForm (formId, fieldId) {
            console.log(formId + " " + fieldId);
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function (response) {
                    console.log("successful delete");
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
}) ();