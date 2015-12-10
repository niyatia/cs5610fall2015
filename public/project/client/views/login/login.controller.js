"use strict";
(function(){
    angular
        .module("HomeMadeDinnerApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        var model = this;
       // model.login = login;

        model.login =  function login(){
            var username = model.username;
            var password = model.password;
            UserService.findUserByUsernameAndPassword(username, password)
                .then(getUser);
        };

        function getUser(loggedInUser){
            console.log("login test 1");
            $rootScope.user = loggedInUser;
            if($rootScope.user.userType == 0){
                $location.url("/user-home");
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