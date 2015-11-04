"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("ChefProfileController", ChefProfileController)

    function ChefProfileController ($scope, $rootScope, UserService, $location, DishService) {
        var recipe = {};
        var dishes = [];

        DishService.filterDishByUsername($rootScope.user.username, dishesFound);

        function dishesFound(chefDishes){
            console.log(chefDishes);
            dishes= chefDishes;
        }
        $scope.addDish = addDish;
        function addDish(){
            $location.url("/add-dish");
        }

        $scope.add = add;
        function add(){
            console.log($rootScope.user);
            $scope.recipe.chef = $rootScope.user.username;
            DishService.createDish($scope.recipe, dishCreated);

            function dishCreated(recipe){
                $location.url("/chef-profile");
            }
        }

        $scope.recipes = dishes;
        console.log($rootScope.user);
        $scope.user = $rootScope.user;
    }
}) ();