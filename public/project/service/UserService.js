"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("UserService", UserService);

    function UserService() {

        var firstUser = {
            id: 1,
            username: "niyati",
            password: "a1b2c3",
            fullname: "Niyati Acharya",
            phone: 2062678838,
            address: "2230, 4th ave",
            zip: 98121,
            email: "abc@mail.com",
            userType: 0
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
                if((users[i].username == findUserName) && (users[i].password == findPassword)) {
                    callback(users[i]);
                    return;
                }
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(newUser, callback) {
            console.log(newUser);
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