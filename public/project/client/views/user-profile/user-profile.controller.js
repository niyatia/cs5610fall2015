"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("UserProfileController", UserProfileController)

    function UserProfileController ($rootScope, UserService, $location) {
        var model = this;
        console.log($rootScope.user);
        model.username = $rootScope.user.username;
        model.password = $rootScope.user.password;
        model.email = $rootScope.user.email;
        model.fullname = $rootScope.user.fullname;
        model.phone = $rootScope.user.phone;
        model.address = $rootScope.user.address;
        model.zip = $rootScope.user.zip;

        model.update = function(){

            var userId = $rootScope.user._id;
            console.log(userId);
            var updatedUser = {
                username: model.username,
                password: model.password,
                _id: $rootScope.user._id,
                fullname: model.fullname,
                email: model.email,
                phone: model.phone,
                address: model.address,
                zip: model.zip};
            UserService.updateUser(userId, updatedUser)
                .then(function(user){
                    if(user != null){
                        $rootScope.user = user;
                        $location.url("/user-home");
                    }
                })
        }
    }
}) ();