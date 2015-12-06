"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("OrderController", OrderController)

    function OrderController ($rootScope, OrderService, $location) {

        var model = this;
        model.user = $rootScope.user;
        model.userSelectedDishes = $rootScope.userSelectedDishes;
        model.dataloaded = true;
        console.log(model.dataloaded);
        calculateTotalAmount();
        model.remove = remove;

        function remove(index){
            model.userSelectedDishes.splice(index,1);
            calculateTotalAmount();
        }

        model.months = [ 1,2,3,4,5,6,7,8,9,10,11,12 ]
        model.years =  [ 2015, 2016, 2017, 2018, 2019, 2020]

        model.pay = pay;

        function pay(){
            model.dataloaded = false;
            console.log(model.cardDetails);

            var order = {
                customerId: model.user._id,
                creditCardDetails: model.cardDetails,
                totalAmount : model.totalAmount,
                dishes : model.userSelectedDishes
            };

            OrderService.placeOrder(order)
                .then(function(orders){
                    console.log(orders);
                    model.dataloaded = true;
                    if(orders.error == "VALIDATION_ERROR"){
                        model.cardError = "Incorrect cardNumber";
                    }
                    else {
                        $location.url("/thankyou");
                    }
                });
        }

        function calculateTotalAmount(){
            var total = 0;
            for(var i = 0; i < model.userSelectedDishes.length; i++){
                total += model.userSelectedDishes[i].price * model.userSelectedDishes[i].quantity;
            }

            model.totalAmount = total;
        }
    }
}) ();