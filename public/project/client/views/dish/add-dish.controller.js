"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .controller("AddDishController", AddDishController)

    function AddDishController ($scope, $rootScope, $location, DishService) {

        var model = this;

        $scope.imageChanged = imageChanged;

        function imageChanged(element){
            var name = element.files[0].name;
            if(name.length <= 4)
                alert("The input is invalid");
            else{
                var extension = name.substring(name.length -3, name.length).toLowerCase()
                if(extension != "jpg" && extension != 'png')
                    alert('The input is invalid');
                else{
                    console.log(element.files[0]);
                    model.image = element.files[0];
                }
            }
        }

        model.add = add;
        function add(){

            console.log(model.image);
            model.recipe.image = model.image;
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