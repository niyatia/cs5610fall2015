"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("ChefProfileController", ChefProfileController)

    function ChefProfileController ($rootScope, UserService, $location, DishService) {

        var model = this;
        model.user = $rootScope.user;

        DishService.filterDishByUsername($rootScope.user.username)
            .then(function (chefDishes){
            console.log("init");
            console.log(chefDishes);
            model.dishes= chefDishes;
        });

        model.addDish = addDish;
        function addDish(){
            $location.url("/add-dish");
        }
    }
}) ();