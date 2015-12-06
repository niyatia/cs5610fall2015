"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("RatingService", RatingService);

    function RatingService($http, $q) {

        var api = {
            addRating: addRating,
            findRatingByDishId : findRatingByDishId
        };

        return api;

        function addRating(rating) {
            var deferred = $q.defer();

            $http.post("/api/project/rating", rating)
                .success(function(ratingComplete){
                    console.log("rating created- back in client service");
                    deferred.resolve(ratingComplete);
                });

            return deferred.promise;
        }

        function findRatingByDishId(dishId){
            var deferred = $q.defer();

            $http.get("/api/project/rating/dishId="+dishId)
                .success(function(myRatings){

                    console.log("rating fetched- back in client service");
                    console.log(myRatings);
                    deferred.resolve(myRatings);
                });

            return deferred.promise;
        }


    }
})();