"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("OrderService", OrderService);

    function OrderService($http, $q) {

        var api = {
            placeOrder: placeOrder,
            findOrderByCustomerId : findOrderByCustomerId,
            findOrders : findOrders
        };

        return api;

        function placeOrder(order) {
            var deferred = $q.defer();

            $http.post("/api/project/order", order)
                .success(function(orderComplete){
                    var result = [];
                    var error;
                    console.log(orderComplete);
                    if(orderComplete.error == "VALIDATION_ERROR"){
                        error = "VALIDATION_ERROR";
                        return error;
                    }
                    else if(orderComplete.error == "PAYMENT_ERROR"){
                        error = "PAYMENT_ERROR";
                        return error;
                    }
                    else {
                        deferred.resolve(orderComplete);
                        console.log("order created- back in client service");
                    }
                });

            return deferred.promise;
        }

        function findOrderByCustomerId(customerId){
            var deferred = $q.defer();

            $http.get("/api/project/order/customerId="+customerId)
                .success(function(myOrders){
                    console.log("order fetched- back in client service");
                    console.log(myOrders);
                    deferred.resolve(myOrders);
                });

            return deferred.promise;
        }

        function findOrders(chefname){
            var deferred = $q.defer();

            $http.get("/api/project/order/chefname="+chefname)
                .success(function(myOrders){
                    console.log("order fetched- back in client service");
                    console.log(myOrders);
                    deferred.resolve(myOrders);
                });

            return deferred.promise;
        }
    }
})();