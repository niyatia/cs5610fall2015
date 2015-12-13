"use strict";
(function(){
    angular
        .module("HomeMadeDinnerApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        var model = this;
       // model.login = login;

        model.login =  function login(){
            var user = {
                username : model.username,
                password : model.password
            }
            UserService.findUserByUsernameAndPassword(user)
                .then(getUser);
        };

        function getUser(loggedInUser){
            console.log("login test 1");
            $rootScope.loggedInUser = loggedInUser;
            if($rootScope.loggedInUser.userType == 0){
                $location.url("/user-home");
            }
            if($rootScope.loggedInUser.userType == 1){
                $location.url("/chef-profile");
            }
            if($rootScope.loggedInUser.userType == 2){
                $location.url("/driver-profile");
            }
        }
    }

})();