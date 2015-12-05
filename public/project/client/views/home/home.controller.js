"use strict";
(function(){
    angular
        .module("HomeMadeDinnerApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, DishService) {
        var model = this;

        model.search =  function search(){
            console.log("inside search");
            DishService.findAllDishes()
                .then(showDishes);
        };

        function showDishes(dishes){
            $rootScope.dishes = dishes;
            $location.url("/user-home");
        }
    }

})();