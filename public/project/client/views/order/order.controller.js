"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("OrderController", OrderController)

    function OrderController ($rootScope, OrderService, $location) {

        var model = this;
        model.user = $rootScope.user;
        model.userSelectedDishes = $rootScope.userSelectedDishes;
        model.totalAmount = $rootScope.totalAmount;

        model.pay = pay;

        function pay(){
            var order = {
                customerId: model.user._id,
                creditCardDetails: model.creditCardDetails,
                totalAmount : model.totalAmount,
                dishes : model.userSelectedDishes
            };

            OrderService.placeOrder(order)
                .then(function(){
                    $location.url("/thankyou");
                });
        }

        function calculateTotalAmount(){
            var total = 0;
            for(var i = 0; i < model.userSelectedDishes.length; i++){
                total += model.userSelectedDishes[i].price * model.userSelectedDishes[i].quantity;
            }

            return total;
        }
    }
}) ();