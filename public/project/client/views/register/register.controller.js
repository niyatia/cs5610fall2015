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
                    $rootScope.user = createdUser;

                    if($rootScope.user.userType == 0){
                        console.log("inside if");
                        $location.url("/user-profile");
                    }
                    if($rootScope.user.userType == 1){
                        $location.url("/chef-profile");
                    }
                    if($rootScope.user.userType == 2){
                        $location.url("/driver-profile");
                    }
                })
        }
    }
}) ();