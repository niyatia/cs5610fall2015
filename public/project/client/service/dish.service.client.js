"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("DishService", DishService);

    function DishService($http, $q) {

        var api = {
            filterDishByUsername: filterDishByUsername,
            findAllDishes: findAllDishes,
            createDish: createDish,
            deleteDishById: deleteDishById,
            updateUser: updateUser
        };

        return api;

        function filterDishByUsername(username) {
            var deferred = $q.defer();

            $http.get("/api/project/dish/username=" + username)
                .success(function(dishes){
                    console.log(dishes);
                    deferred.resolve(dishes);
                    console.log("returned from service.client");
                });

            return deferred.promise;
        }

        function findAllDishes() {
            var deferred = $q.defer();
            $http.get("/api/project/dish/")
                .success(function(dishes){
                    deferred.resolve(dishes);
                });

            return deferred.promise;
        }

        function createDish(newDish) {
            var deferred = $q.defer();
            var path = Path.Combine(Server.MapPath("~/Photos/") + file.FileName);
            file.SaveAs(path);

            $http.post("/api/project/dish", newDish)
                .success(function(dish){
                    console.log("dish created- back in client service");
                    deferred.resolve(dish);
                });

            return deferred.promise;
        }

        function deleteDishById(dishId) {
            var deferred = $q.defer();

            $http.delete("/api/project/dish/"+dishId)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(dishId, newDish) {
            var deferred = $q.defer();
            console.log(dishId);
            $http.put("/api/project/user/"+dishId, newDish)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
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
    }
})();