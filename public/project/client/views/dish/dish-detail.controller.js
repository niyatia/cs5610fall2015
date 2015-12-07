"use strict";
(function(){
    angular
        .module("HomeMadeDinnerApp")
        .controller("DishDetailController", DishDetailController);

    function DishDetailController($rootScope, $location, RatingService, DishService) {
        var model = this;
        model.recipe = $rootScope.recipe;
        model.fromMyOrders = $rootScope.fromMyOrders;
        console.log(model.fromMyOrders);
        console.log($rootScope.recipe);
        model.goBack = goBack;
        model.addRating = addRating;

        function addRating(newRating){
            console.log(newRating);
            var newRatingObj = {
                customerId : $rootScope.user._id,
                chef : model.recipe.chef,
                rating : newRating,
                dishId : model.recipe._id
            }

            RatingService.addRating(newRatingObj)
                .then(function(rating){
                    RatingService.findRatingByDishId(rating.dishId)
                        .then(function(ratings){
                            var sum = 0;
                            var avgRating = 0;
                            var count = ratings.length;
                            for(var i = 0; i < count; i++){
                               sum+= ratings[i].rating;
                            }

                            avgRating = sum/count;
                            console.log(rating.dishId);
                            DishService.findDishById(rating.dishId)
                                .then(function(dish){
                                    console.log("found dish");
                                    console.log(dish);
                                    dish.rating = avgRating;
                                    DishService.updateDish(rating.dishId, dish)
                                        .then(function(updatedDish){
                                            console.log(updatedDish);
                                            model.recipe = updatedDish;
                                        })
                                })
                        })
                    $location.url("/user-order");
                });
        }
        function goBack(){
            if(model.fromMyOrders == true)
                $location.url("/user-order");
            else
                $location.url("/user-home");
        }
    }

})();