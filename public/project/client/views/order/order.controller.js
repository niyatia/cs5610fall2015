"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("OrderController", OrderController)

    function OrderController ($rootScope, OrderService, $location, DishService) {

        var model = this;
        model.user = $rootScope.loggedInUser;
        model.userSelectedDishes = $rootScope.userSelectedDishes;
        model.dataloaded = true;
        console.log(model.dataloaded);
        calculateTotalAmount();
        model.remove = remove;

        function remove(index){
            if(model.userSelectedDishes[index].quantity > 1){
                model.userSelectedDishes[index].quantity--;
                DishService.findDishById(model.userSelectedDishes[index]._id)
                    .then(function(dish){
                        dish.quantity++;
                        DishService.updateDish(dish._id, dish)
                            .then(function(dish) {
                                console.log(dish);
                            });
                    })

            }else{

                DishService.findDishById(model.userSelectedDishes[index]._id)
                    .then(function(dish){
                        dish.quantity++;
                        DishService.updateDish(dish._id, dish)
                            .then(function(dish) {
                                console.log(dish);
                            });
                    })
                model.userSelectedDishes.splice(index,1);
            }

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
                customerEmail : model.user.email,
                creditCardDetails: model.cardDetails,
                totalAmount : model.totalAmount,
                dishes : model.userSelectedDishes
            };

            OrderService.placeOrder(order)
                .then(orderCreated, orderError);
        }

        function orderCreated(orders){
            console.log(orders);
            model.dataloaded = true;
            if(orders.error == "VALIDATION_ERROR"){
                model.cardError = "Incorrect cardNumber";
            }
            else {
                $location.url("/thankyou");
            }
        }

        function orderError(error){
            model.dataloaded = true;
            if(orders.error == "VALIDATION_ERROR"){
                model.cardError = "Incorrect cardNumber";
            }
            else{
                model.error = "There was an error in payment. Please try again later.";
            }
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