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

		$scope.addForm = function() {
			FormService.createFormForUser(currUser.id, $scope.newForm, formCreated);

            function formCreated(updatedForm) {
                $scope.forms.push(updatedForm);
                $scope.newForm = {};
            }
		}

		$scope.updateForm = function() {
            FormService.updateFormById($scope.newForm.id, $scope.newForm, function (allForms) {
                FormService.findAllFormsForUser(currUser.id, foundForms);
                $scope.newForm = {};
            });
		}

		$scope.deleteForm = function(index) {
            FormService.deleteFormById($scope.forms[index].id, function (allForms) {
                FormService.findAllFormsForUser(currUser.id, foundForms);
            });
		}

		$scope.selectForm = function(index) {
            var newValue = $scope.forms[index];
            $scope.newForm = newValue;
		}
	}
}) ();