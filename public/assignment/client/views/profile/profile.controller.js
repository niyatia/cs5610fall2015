"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController ($scope, $rootScope, UserService) {

        console.log($rootScope.user);
        $scope.user = $rootScope.user;

        $scope.update = function () {
            var userId = $scope.user.id;
            var newUser = $scope.user;

            UserService.updateUser(userId, newUser, updatedUser);
        }

        function updatedUser (user) {
            console.log(user);
        }
    }
}) ();