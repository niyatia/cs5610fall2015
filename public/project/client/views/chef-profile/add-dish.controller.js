"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("AddDishController", AddDishController)

    function AddDishController ($rootScope, UserService, $location, DishService) {

        var model = this;

        model.add = add;
        function add(){
            console.log($rootScope.user);
            model.recipe.chef = $rootScope.user.username;
            DishService.createDish(model.recipe)
                .then(function (recipe){
                    console.log(recipe);
                    $location.url("/chef-profile");
            });
        }

        console.log($rootScope.user);
        model.user = $rootScope.user;
    }
}) ();