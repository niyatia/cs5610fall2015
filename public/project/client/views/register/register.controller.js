"use strict";
(function () {
    console.log("inside register controller");
    angular
        .module("HomeMadeDinnerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController ( $rootScope, $location, UserService) {
        console.log("inside register controller");

        var model = this;
        console.log(model.newUser);
        model.register = function register (userType) {
            console.log(userType);
            model.newUser.userType = userType;
            console.log(model.newUser);

            UserService.createUser(model.newUser)
                .then(function(createdUser) {
                    console.log("inside user created");
                    console.log(createdUser);
                    $rootScope.loggedInUser = createdUser;

                    if($rootScope.loggedInUser.userType == 0){
                        console.log("inside if");
                        $location.url("/user-home");
                    }
                    if($rootScope.loggedInUser.userType == 1){
                        $location.url("/chef-profile");
                    }
                    if($rootScope.loggedInUser.userType == 2){
                        $location.url("/driver-profile");
                    }
                })
        }
    }
}) ();