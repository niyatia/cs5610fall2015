"use strict";
(function(){
    angular
        .module("HomeMadeDinnerApp")
        .controller("DishDetailController", DishDetailController);

    function DishDetailController($rootScope, $location, RatingService) {
        var model = this;
        model.recipe = $rootScope.recipe;
        console.log($rootScope.recipe);
        model.goBack = goBack;
        model.addRating = addRating;

        function addRating(newRating){
            var newRatingObj = {
                customerId : $rootScope.user._id,
                chef : model.recipe.chef,
                rating : newRating,
                dishId : model.recipe._id
            }

            RatingService.addRating(newRatingObj)
                .then(function(rating){
                    $location.url("/user-order");
                });
        }
        function goBack(){
            if($rootScope.fromMyOrders)
                $location.url("/user-order");
            else
                $location.url("/user-home");
        }
    }

})();