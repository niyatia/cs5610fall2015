"use strict";
(function(){
    angular
        .module("HomeMadeDinnerApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        console.log("login test0");
        $scope.username = "";
        $scope.password = "";
        console.log($scope.username);
        $scope.login =  function login(){
            console.log("login test");
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, getUser);
        };

        function getUser(loggedInUser){
            console.log("login test 1");
            $rootScope.user = loggedInUser;
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

})();