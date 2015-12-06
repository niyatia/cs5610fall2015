"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("UserOrderController", UserOrderController)

    function UserOrderController ($rootScope, $location) {
        var model = this;
        console.log($rootScope.myOrders);

        model.orders = $rootScope.myOrders;
        model.rateDish = rateDish;

        function rateDish(dish){
            console.log(dish);
            $rootScope.recipe = dish;
            $rootScope.fromMyOrders = false;
            $location.url('/recipeDetails');
        }
    }
}) ();