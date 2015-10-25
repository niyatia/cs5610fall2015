"use strict";
(function() {
	angular
	.module("FormBuilderApp")
	.controller("FormController", FormController);

	function FormController ($scope, $rootScope, UserService, FormService) {
		
		var currUser = $rootScope.user;

		FormService.findAllFormsForUser(currUser.id, foundForms);

		function foundForms (userForms) {
			$scope.forms = userForms;
		}

		$scope.addForm = function(newForm) {
			var myNewForm = {};

			myNewForm.name = newForm.name;
			FormService.createFormForUser(currUser.id, myNewForm, formCreated);

            function formCreated(updatedForm) {
                var newForm = updatedForm;
                $scope.forms.push(newForm);
            }
		}

		$scope.updateForm = function() {

		}

		$scope.deleteForm = function(form) {
            console.log(form.name);
            FormService.deleteFormById(form.id, formDeleted);

            function formDeleted(remainingForms){
                $scope.forms = remainingForms;
            }
		}

		$scope.selectForm = function() {
		}


	}
}) ();