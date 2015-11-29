"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("UserProfileController", UserProfileController)

    function UserProfileController ($scope, $rootScope, UserService, $location, DishService) {
        var recipe = {};
        var dishes = [];
        var userSelectedDishes = [];

        var model = this;
        model.user = $rootScope.user;

       // model.name = $rootScope.user.fullname;

        DishService.findAllDishes(getDishes);
        function getDishes(listOfDish){
            dishes = listOfDish;
        }

        model.createDialog = createDialog;

        function createDialog(index){
            $rootScope.recipe = dishes[index];
            $location.url("/recipeDetails");
        }

        model.goBack = goBack;

        function goBack(){
            $scope.recipe = $rootScope.recipe;
            $location.url("/user-profile");
        }

        model.addToCart = addToCart;

        function addToCart(index) {
            if(dishes[index].quantity == 0){

            }
            else{
                var isAdded = false;
                var selectedItem = dishes[index];

                for(var i = 0; i < userSelectedDishes.length; i++){
                    if(userSelectedDishes[i].title == selectedItem.title){
                        userSelectedDishes[i].quantity++;
                        isAdded = true;
                    }
                }

                if(!isAdded){
                    selectedItem.user = $rootScope.user.username;

                    dishes[index].quantity--;
                    selectedItem.quantity = 1;
                    userSelectedDishes.push(selectedItem);
                }
            }
        }

        model.checkOut = checkOut;

        function checkOut(){
            $rootScope.userSelectedDishes = userSelectedDishes;
            $location.url("/paymentDetails");
        }

        model.pay = pay;

        function pay(){
            $location.url("/thankyou")
        }
        model.userSelectedDishes = $rootScope.userSelectedDishes;
        model.totalAmount = calculateTotalAmount;

        function calculateTotalAmount(){
            var total = 0;
            for(var i = 0; i < model.userSelectedDishes.length; i++){
                total += model.userSelectedDishes[i].price * model.userSelectedDishes[i].quantity;
            }

            return total;
        }

        console.log(model.userSelectedDishes);
        //$scope.totalAmount = totalAmount;
        model.recipes = dishes;

       // model.user = $rootScope.user;
    }
}) ();