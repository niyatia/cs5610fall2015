"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .config(Configure);

    function Configure ($routeProvider) {
        console.log("inside config.js");
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller : "HomeController",
                controllerAs: "model"
            })
            .when("/user-home",
            {
                templateUrl: "views/user-profile/user-home.view.html",
                controller: "UserHomeController",
                controllerAs: "model"
            })
            .when("/user-profile",
            {
                templateUrl: "views/user-profile/user-profile.view.html",
                controller: "UserProfileController",
                controllerAs: "model"
            })
            .when("/user-order",
            {
                templateUrl: "views/user-profile/user-order.view.html",
                controller: "UserOrderController",
                controllerAs: "model"
            })
            .when("/user-register", {
                templateUrl: "views/register/user-register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/chef-register", {
                templateUrl: "views/register/chef-register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/driver-register", {
                templateUrl: "views/register/driver-register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/recipeDetails", {
                templateUrl: "views/dish/dish-detail.view.html",
                controller: "DishDetailController",
                controllerAs: "model"
            })
            .when("/order", {
                templateUrl: "views/order/order.view.html",
                controller: "OrderController",
                controllerAs: "model"
            })
            .when("/paymentDetails", {
                templateUrl: "views/user-profile/payment-details.view.html",
                controller: "UserProfileController",
                controllerAs: "model"
            })
            .when("/thankyou", {
                templateUrl: "views/user-profile/thankyou.view.html",
                controller: "UserProfileController",
                controllerAs: "model"
            })
            .when("/add-dish", {
                templateUrl: "views/dish/add-dish.view.html",
                controller: "AddDishController",
                controllerAs: "model"
            })
            .when("/chef-profile", {
                templateUrl: "views/chef-profile/chef-profile.view.html",
                controller: "ChefProfileController",
                controllerAs: "model"
            })
            .when("/driver-profile", {
                templateUrl: "views/driver-profile/driver-profile.view.html",
                controller: "DriverProfileController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();