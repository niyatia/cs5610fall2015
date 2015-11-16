"use strict";
(function() {
	angular
	.module("FormBuilderApp")
	.controller("FormController", FormController);

	function FormController ($rootScope, UserService, FormService) {
		
		var currUser = $rootScope.user;
        var model = this;
        model.user = currUser;

		FormService.findAllFormsForUser(currUser.id)
            .then(function(forms){
                console.log(forms);
                model.forms = forms;
            });

        model.addForm = function() {
            var newForm = { userId: currUser.id, title: model.title};
			FormService.createFormForUser(currUser.id, newForm)
                .then(function(form){
                    model.currentForm = form;
                    model.forms.push(model.currentForm);
                });
		}

        model.updateForm = function() {
            console.log(model.currentForm);
            var newForm = { id : model.currentForm.id, title : model.title};
            FormService.updateFormById(model.currentForm.id, newForm)
                .then(function(forms){
                    model.forms= forms;
                    model.title = "";
                });
		}

        model.deleteForm = function(index) {
            FormService.deleteFormById(index)
                .then(function(forms){
                    console.log(forms);
                    model.forms = forms;
                });
		}

        model.selectForm = function(formId) {
            console.log(formId);
            FormService.findFormById(formId)
                .then(function(form){
                    console.log(form.title);
                    model.title = form.title;
                    model.currentForm = form;
                });
        }
	}
}) ();