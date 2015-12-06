"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("OrderService", OrderService);

    function OrderService($http, $q) {

        var api = {
            placeOrder: placeOrder,
            findOrderByCustomerId : findOrderByCustomerId
        };

        return api;

        function placeOrder(order) {
            var deferred = $q.defer();

            $http.post("/api/project/order", order)
                .success(function(orderComplete){
                    console.log("order created- back in client service");
                    deferred.resolve(orderComplete);
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


    }
})();