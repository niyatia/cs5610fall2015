"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("UserProfileController", UserProfileController)

    function UserProfileController ($rootScope, UserService, $location, DishService) {

        var model = this;
        model.user = $rootScope.user;

        model.recipe = $rootScope.recipe;

        initDishes();
        function initDishes() {
            DishService.findAllDishes()
                .then(function (listOfDish) {
                    model.dishes = listOfDish;
                    model.userSelectedDishes = [];
                });
        }

        model.createDialog = createDialog;

        function createDialog(index){
            console.log("inside create dialog");
            $rootScope.recipe = model.dishes[index];
            $location.url("/recipeDetails");
        }

        model.goBack = goBack;

        function goBack(){
            $location.url("/user-profile");
        }

        model.addToCart = addToCart;

        function addToCart(index) {
            if(model.dishes[index].quantity == 0){

            }
            else{
                var isAdded = false;
                var selectedItem = model.dishes[index];

                if(model.userSelectedDishes != null){
                    for(var i = 0; i < model.userSelectedDishes.length; i++){
                        if(model.userSelectedDishes[i].title == selectedItem.title){
                            model.userSelectedDishes[i].quantity++;
                            isAdded = true;
                        }
                    }
                }

                if (!isAdded) {
                    selectedItem.user = $rootScope.user.username;

                    model.dishes[index].quantity--;
                    selectedItem.quantity = 1;
                    model.userSelectedDishes.push(selectedItem);
                }

            }
        }

        model.checkOut = checkOut;

        function checkOut(){
            $rootScope.userSelectedDishes = model.userSelectedDishes;
            $location.url("/order");
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
    }
}) ();