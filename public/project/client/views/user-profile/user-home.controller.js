"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("UserHomeController", UserHomeController)

    function UserHomeController ($rootScope, UserService, $location, DishService) {

        var model = this;
        if($rootScope.user){
            console.log($rootScope.user);
            model.loggedInUser = true;
        }
        else{
            console.log($rootScope.user);
            model.user = $rootScope.user;
            model.loggedInUser = false;
        }

        model.updateProfile = updateProfile;

        function updateProfile(){
            $rootScope.user = model.user;
            $location.url("/user-profile");
        }

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

                    console.log(model.dishes[index].quantity);
                    model.dishes[index].quantity--;
                    var selected_item = {title : model.dishes[index].title,
                        cuisine : model.dishes[index].cuisine,
                        type: model.dishes[index].type,
                        price : model.dishes[index].price,
                        img: model.dishes[index].img,
                        chef: model.dishes[index].chef,
                        user: model.dishes[index].user,
                        quantity : 1};

                    console.log(model.dishes[index].quantity);
                   // selectedItem.quantity = 1;

                    console.log(model.dishes[index].quantity);
                    model.userSelectedDishes.push(selected_item);
                }

            }
        }

        model.checkOut = checkOut;

        function checkOut(){
            $rootScope.userSelectedDishes = model.userSelectedDishes;
            $location.url("/order");
        }
    }
}) ();