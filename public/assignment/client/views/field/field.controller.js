"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController (FieldService, FormService, $routeParams, $rootScope) {
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        model.addField = addField;
        model.removeField = removeField;

        FormService.findFormById(formId)
            .then(foundFormById);

        function foundFormById (response) {
            model.form = response;
        }

        initFields();

        function initFields () {
            FieldService.getFieldsForForm(formId)
                .then(initiateGetFieldsForForm);
            function initiateGetFieldsForForm (response) {
                model.fields = response;
            }
        }

        function removeField (field) {
            FieldService.deleteFieldFromForm(formId, field.id)
                .then(initiateDelete);
            function initiateDelete (response) {
                model.fields = response;
            }
            initFields();
        }

        function addField (fieldType) {
            var newField;
            switch (fieldType) {
                case "Single Line Text" :
                    newField = {
                        "id" : null,
                        "label" : "New Text Field",
                        "type" : "TEXT",
                        "placeholder" : "New Field"
                    };
                    break;
                case "Date" :
                    newField = {
                        "id" : null,
                        "label" : "New Date Field",
                        "type" : "DATE"
                    };
                    break;
                case "Dropdown" :
                    newField = {
                        "id" : null,
                        "label" : "New Dropdown",
                        "type" : "OPTIONS",
                        "options" : [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "Checkboxes" :
                    newField = {
                        "id" : null,
                        "label" : "New Checkboxes",
                        "type" : "CHECKBOXES",
                        "options" : [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "Radio buttons" :
                    newField = {
                        "id": null,
                        "label": "New Radio Buttons",
                        "type": "RADIOS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
                case "Multi Line Text" :
                    newField = {
                        "id" : null,
                        "label" : "New Text Field",
                        "type" : "TEXTAREA",
                        "placeholder" : "New Field"
                    };
            }

            FieldService.createNewFieldForForm (formId, newField)
                .then(function(){
                });

                initFields(formId);
        }
    }
}) ();