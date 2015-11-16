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
        console.log(model);

        model.update = function(){

            var userId = $rootScope.user.id;
            var updatedUser = {username: model.username, password: model.password, id: $rootScope.user.id,
                email: model.email, firstname: model.firstname, lastname: model.lastname};

            UserService.updateUser(userId, updatedUser)
                .then(function(user){
                    if(user != null){
                        $rootScope.user = user;
                        console.log(user);
                    }
                })
        }
    }
}) ();