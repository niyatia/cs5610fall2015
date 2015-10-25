"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var firstUser = {
            id: 1,
            userName: "niyati",
            password: "a1b2c3",
            email: "abc@mail.com"
        };

        var users = [firstUser];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        function findUserByUsernameAndPassword(findUserName, findPassword, callback) {
            for (var i in users) {
                if((users[i].userName == findUserName) && (users[i].password == findPassword)) {
                    callback(users[i]);
                    break;
                }
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(newUser, callback) {
            newUser.id = guid();

            users.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for(var i in users) {
                if (users[i].id = userId) {
                    users.splice(i,1);
                }
            }
            callback(users);
        }

        function updateUser(userId, newUser, callback) {
            for(var i in users) {
                if(users[i].id == userId) {
                    users.splice(i,1);
                    newUser.id = userId;
                    users.push(newUser);
                }
            }
            callback(newUser);
        }


        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        return service;
    }
})();