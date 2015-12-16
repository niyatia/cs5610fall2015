"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("DriverProfileController", DriverProfileController)

    function DriverProfileController ($rootScope, UserService, $location) {
        var model = this;
        console.log($rootScope.loggedInUser);
        model.username = $rootScope.loggedInUser.username;
        model.password = $rootScope.loggedInUser.password;
        model.email = $rootScope.loggedInUser.email;
        model.fullname = $rootScope.loggedInUser.fullname;
        model.phone = $rootScope.loggedInUser.phone;
        model.carId = $rootScope.loggedInUser.carId;
        model.licenseId = $rootScope.loggedInUser.licenseId;
        model.address = $rootScope.loggedInUser.address;
        model.zip = $rootScope.loggedInUser.zip;
        model.userType = $rootScope.loggedInUser.userType;
        model.update = function(){

            var userId = $rootScope.loggedInUser._id;
            console.log(userId);
            var updatedUser = {
                username: model.username,
                password: model.password,
                _id: $rootScope.loggedInUser._id,
                fullname: model.fullname,
                email: model.email,
                phone: model.phone,
                address: model.address,
                carId: model.carId,
                licenseId: model.licenseId,
                zip: model.zip,
                userType : model.userType
            };
            UserService.updateUser(userId, updatedUser)
                .then(function(user){
                    if(user != null){
                        $rootScope.loggedInUser = user;
                        $location.url("/driver-home");
                    }
                })
        }
    }
}) ();