"use strict";
(function () {

	angular
	.module("FormBuilderApp")
	.controller("RegisterController", RegisterController);

	function RegisterController ($scope, $rootScope, $location, UserService) {
		
		var model = this;
		
		model.register = function register () {
            var userObj = {username: model.newUser.username, password: model.newUser.password , email: model.newUser.email};
			UserService.createUser(model.newUser)
                .then(function(createdUser) {
                    $rootScope.user = createdUser;
                    $location.url("/profile");
                })
		}
	}
}) ();