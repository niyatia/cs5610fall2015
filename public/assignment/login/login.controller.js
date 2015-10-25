"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.username = "";
        $scope.password = "";

        $scope.login = login;

        function login(){

            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, getUser);
        }

        function getUser(user){
            console.log("login test");
            $rootScope.user = user;
            $location.url = "/profile";
        }
    }

})();