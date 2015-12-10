"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("ChefProfileController", ChefProfileController)

    function ChefProfileController ($rootScope, OrderService, $location, DishService) {

        var model = this;
        model.user = $rootScope.user;

        DishService.filterDishByUsername($rootScope.user.username)
            .then(function (chefDishes){
            console.log("init");
            console.log(chefDishes);
            model.dishes= chefDishes;
        });

        OrderService.findOrders($rootScope.user.username)
            .then(function(myOrders){
                model.orders = myOrders;
            })

        model.addDish = addDish;
        function addDish(){
            $location.url("/add-dish");
        }
    }
}) ();