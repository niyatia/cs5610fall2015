"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("UserProfileController", UserProfileController)

    function UserProfileController ($scope, $rootScope, UserService, $location, DishService) {
        var recipe = {};
        var dishes = [];
        var userSelectedDishes = [];

        $scope.name = $rootScope.user.fullname;

        DishService.findAllDishes(getDishes);
        function getDishes(listOfDish){
            dishes = listOfDish;
        }

        $scope.createDialog = createDialog;

        function createDialog(index){
            $rootScope.recipe = dishes[index];
            $location.url("/recipeDetails");
        }

        $scope.goBack = goBack;

        function goBack(){
            $scope.recipe = $rootScope.recipe;
            $location.url("/user-profile");
        }

        $scope.addToCart = addToCart;

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

        $scope.checkOut = checkOut;

        function checkOut(){
            $rootScope.userSelectedDishes = userSelectedDishes;
            $location.url("/paymentDetails");
        }

        $scope.pay = pay;

        function pay(){
            $location.url("/thankyou")
        }
        $scope.userSelectedDishes = $rootScope.userSelectedDishes;
        $scope.totalAmount = calculateTotalAmount;

        function calculateTotalAmount(){
            var total = 0;
            for(var i = 0; i < $scope.userSelectedDishes.length; i++){
                total += $scope.userSelectedDishes[i].price * $scope.userSelectedDishes[i].quantity;
            }

            return total;
        }

        console.log($scope.userSelectedDishes);
        //$scope.totalAmount = totalAmount;
        $scope.recipes = dishes;

        $scope.user = $rootScope.user;
    }
}) ();