"use strict";
(function () {
    console.log("inside register controller");
    angular
        .module("HomeMadeDinnerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController ($scope, $rootScope, $location, UserService) {
        console.log("inside register controller");
        var newUser;

        $scope.newUser = newUser;

        $scope.register = function register (userType) {
            console.log(userType);
            $scope.newUser.userType = userType;
            console.log($scope.newUser);
            UserService.createUser($scope.newUser, userCreated);
        }

        function userCreated (createdUser) {

            $rootScope.user = createdUser;

            if($rootScope.user.userType == 0){
                $location.url("/user-profile");
            }
            if($rootScope.user.userType == 1){
                $location.url("/chef-profile");
            }
            if($rootScope.user.userType == 2){
                $location.url("/driver-profile");
            }
        }
    }
}) ();