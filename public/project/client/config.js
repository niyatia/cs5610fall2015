"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/user-profile",
            {
                templateUrl: "views/user-profile/user-profile.view.html",
                controller: "ProfileController",
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
                templateUrl: "views/user-profile/recipeDetails.view.html",
                controller: "UserProfileController",
                controllerAs: "model"
            })
            .when("/paymentDetails", {
                templateUrl: "views/user-profile/payment-details.view.html",
                controller: "UserProfileController",
                controllerAs: "model"
            })
            .when("/add-dish", {
                templateUrl: "chef-profile/add-dish.view.html"
            })
            .when("/chef-profile", {
                templateUrl: "chef-profile/chef-profile.view.html"
            })
            .when("/driver-profile", {
                templateUrl: "driver-profile/driver-profile.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();