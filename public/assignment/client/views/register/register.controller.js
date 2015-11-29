"use strict";
(function () {

	angular
	.module("FormBuilderApp")
	.controller("RegisterController", RegisterController);

	function RegisterController ($rootScope, $location, UserService) {
		
		var model = this;
		
		model.register = function register () {
            var userObj = {username: model.newUser.username, password: model.newUser.password , email: model.newUser.email};
			UserService.createUser(userObj)
                .then(function(createdUser) {
                    $rootScope.user = createdUser;
                    $location.url("/profile");
                })
		}
	}
}) ();