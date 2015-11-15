"use strict";
(function() {
	angular
	.module("FormBuilderApp")
	.controller("FormController", FormController);

	function FormController ($scope, $rootScope, UserService, FormService) {
		
		var currUser = $rootScope.user;
        var model = this;

		FormService.findAllFormsForUser(currUser.id)
            .then(function(forms){
                console.log(forms);
                model.forms = forms;
            });

        model.addForm = function() {
            var newForm = { userId: $rootScope.user.id, title: model.title};
			FormService.createFormForUser($rootScope.user.id, newForm)
                .then(function(form){
                    model.currentform = form;
                    model.forms.push(model.currentform);
                });
		}

        model.updateForm = function() {
            FormService.updateFormById(model.currentform.formId, newForm)
                .then(function(form){
                    model.currentform = form;
                });
		}

        model.deleteForm = function(index) {
            FormService.deleteFormById(index)
                .then(function(forms){
                    console.log(forms);
                    model.forms = forms;
                });
		}

        model.selectForm = function(index) {
            var newValue = $scope.forms[index];
            $scope.newForm = newValue;
		}
	}
}) ();