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
            console.log(loggedInUser);
            if(loggedInUser != null){
                $rootScope.loggedInUser = loggedInUser;
                if($rootScope.loggedInUser.userType == 0){
                    $location.url("/user-home");
                }
                if($rootScope.loggedInUser.userType == 1){
                    $location.url("/chef-home");
                }
                if($rootScope.loggedInUser.userType == 2){
                    $location.url("/driver-home");
                }
            }
            else{
                model.message = "Invalid username or password";
            }
        }
    }

})();