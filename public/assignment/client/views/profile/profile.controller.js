"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController ($scope, $rootScope, UserService) {
        var model = this;
        model.username = $rootScope.user.username;
        model.password = $rootScope.user.password;
        model.email = $rootScope.user.email;
        model.firstname = $rootScope.user.firstName;
        model.lastname = $rootScope.user.lastName;

        model.update = function(){

            var userId = $rootScope.user._id;
            console.log(userId);
            var updatedUser = {username: model.username, password: model.password, _id: $rootScope.user._id,
                firstName: model.firstname, lastName: model.lastname};
            console.log(updatedUser);
            UserService.updateUser(userId, updatedUser)
                .then(function(user){
                    if(user != null){
                        $rootScope.user = user;
                    }
                })
        }
    }
}) ();