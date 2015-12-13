"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            logout: logout
        };

        return api;

        function findUserByUsernameAndPassword(user) {
            var deferred = $q.defer();
            console.log(user);
            $http.post("/api/project/user/login", user)
                .success(function(user){
                    console.log(user);
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/project/user/")
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function createUser(newUser) {
            var deferred = $q.defer();
            newUser.id = guid();
            newUser.firstName = "";
            newUser.lastName = "";
            $http.post("/api/project/user", newUser)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function logout () {
            var deferred = $q.defer();
            $http
                .post("/api/project/user/logout")
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http.delete("/api/project/user/"+userId)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(userId, newUser) {
            var deferred = $q.defer();
            console.log(userId);
            $http.put("/api/project/user/"+userId, newUser)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();