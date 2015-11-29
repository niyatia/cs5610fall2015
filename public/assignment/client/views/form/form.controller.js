"use strict";
(function() {
	angular
	.module("FormBuilderApp")
	.controller("FormController", FormController);

	function FormController ($rootScope, UserService, FormService) {

		var currUser = $rootScope.user;
        var model = this;
        model.user = currUser;

        loadAllForms();
		function loadAllForms() {
            FormService.findAllFormsForUser(currUser._id)
                .then(function (forms) {
                    model.forms = forms;
                    console.log(model.forms);
                });
        }

        model.addForm = function() {
            console.log($rootScope.user);
            var newForm = { userId: currUser._id, title: model.title};

            console.log(newForm);
			FormService.createFormForUser(newForm)
                .then(function(form){
                    loadAllForms();
                    model.title = "";
                });
		}

        model.updateForm = function() {

            var updatedForm = { _id : model.currentForm._id, title : model.title, userId: currUser._id};
            FormService.updateFormById(model.currentForm._id, updatedForm)
                .then(function(forms){
                    loadAllForms();
                    model.title = "";
                });
		}

        model.deleteForm = function(index) {
            FormService.deleteFormById(index)
                .then(function(forms){
                    loadAllForms();
                });
		}

        model.selectForm = function(formId) {

            FormService.findFormById(formId)
                .then(function(form){
                    model.title = form.title;
                    model.currentForm = form;
                });
        }
	}
}) ();