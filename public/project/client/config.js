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
                templateUrl: "views/user/user-home.view.html",
                controller: "UserHomeController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedInGeneral
                }
            })
            .when("/user-profile",
            {
                templateUrl: "views/user/user-profile.view.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user-order",
            {
                templateUrl: "views/user/user-order.view.html",
                controller: "UserOrderController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
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
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/order", {
                templateUrl: "views/order/order.view.html",
                controller: "OrderController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/paymentDetails", {
                templateUrl: "views/user/payment-details.view.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }

            })
            .when("/thankyou", {
                templateUrl: "views/user/thankyou.view.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/add-dish", {
                templateUrl: "views/dish/add-dish.view.html",
                controller: "AddDishController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/chef-home", {
                templateUrl: "views/chef/chef-home.view.html",
                controller: "ChefHomeController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/chef-profile",
            {
                templateUrl: "views/chef/chef-profile.view.html",
                controller: "ChefProfileController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/driver-home", {
                templateUrl: "views/driver/driver-home.view.html",
                controller: "DriverHomeController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/driver-profile",
            {
                templateUrl: "views/driver/driver-profile.view.html",
                controller: "DriverProfileController",
                controllerAs: "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();

var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/api/project/user/loggedin').success(function(user)
    {
        console.log("in config- check LoggedIn");
        if (user != '0')
        {
            $rootScope.loggedInUser = user;
            deferred.resolve();
        }
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};

var checkLoggedInGeneral = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/api/project/user/loggedin').success(function(user)
    {
        console.log("in config- check LoggedIn general");
        if (user != '0')
        {
            $rootScope.loggedInUser = user;
            deferred.resolve();
        } else
            deferred.resolve();
    });

    return deferred.promise;
};