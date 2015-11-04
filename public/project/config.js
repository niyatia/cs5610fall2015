"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/user-profile", {
                templateUrl: "user-profile/user-profile.view.html"
            })
            .when("/user-register", {
                templateUrl: "register/user-register.view.html"
            })
            .when("/chef-register", {
                templateUrl: "register/chef-register.view.html"
            })
            .when("/driver-register", {
                templateUrl: "register/driver-register.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html"
            })
            .when("/recipeDetails", {
                templateUrl: "user-profile/recipeDetails.view.html"
            })
            .when("/paymentDetails", {
                templateUrl: "user-profile/payment-details.view.html"
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