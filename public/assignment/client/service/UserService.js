"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByUsernameAndPassword(findUserName, findPassword) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/username=" + findUserName + "&password=" + findPassword)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            console.log("in client service");
            $http.get("/api/assignment/user/")
                .success(function(users){
                    console.log(users);
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user"+userId)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function createUser(newUser) {
            var deferred = $q.defer();

            $http.post("/api/assignment/user", newUser)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/user/"+userId)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(userId, newUser) {
            var deferred = $q.defer();

            $http.put("/api/assignment/user/"+userId, newUser)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();