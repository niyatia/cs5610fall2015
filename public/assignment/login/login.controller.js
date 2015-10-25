"use strict";
(function(){
    angular
        .module("FormBuilderApp")
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
            console.log($rootScope.user.username);
            $location.url("/profile");
        }
    }

})();