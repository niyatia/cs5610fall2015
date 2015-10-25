"use strict";
(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $rootScope, $location){

        $scope.user.username = "";
        $scope.user.password = "";

        $scope.login = login;

        function login(){
            console.log("login test");
            UserService.findUserByUsernameAndPassword($scope.user.username, $scope.user.password, foundUser);
        }

        function foundUser(user){
            console.log("found user test");
            $rootScope.user = user;
            $location.url = "/profile";
        }
    }

})();