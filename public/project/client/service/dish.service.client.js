"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("DishService", DishService);

    function DishService($http, $q) {

        var api = {
            filterDishByUsername: filterDishByUsername,
            findAllDishes: findAllDishes,
            findDishById : findDishById,
            getCuisines : getCuisines,
            getTypes : getTypes,
            createDish: createDish,
            deleteDishById: deleteDishById,
            updateDish: updateDish
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

        function findDishById(dishId) {
            var deferred = $q.defer();
            $http.get("/api/project/dish/dishId=" + dishId)
                .success(function(dish){
                    deferred.resolve(dish);
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

        function getCuisines() {
            var deferred = $q.defer();
            $http
                .get("/api/project/dish/cuisine")
                .success(function(cuisines) {
                    deferred.resolve(cuisines);
                });
            return deferred.promise;
        }

        function getTypes() {
            var deferred = $q.defer();
            $http
                .get("/api/project/dish/type")
                .success(function(types) {
                    deferred.resolve(types);
                    console.log(types);
                });
            return deferred.promise;
        }

        function createDish(newDish) {
            var deferred = $q.defer();
            $http.post("/api/project/dish", newDish)
                .success(function(dishes){
                    console.log("dish created- back in client service");
                    deferred.resolve(dishes);
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

        function updateDish(dishId, newDish) {
            var deferred = $q.defer();
            console.log(dishId);
            $http.put("/api/project/dish/"+dishId, newDish)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();