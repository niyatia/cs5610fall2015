"use strict";
(function () {
    angular
        .module("HomeMadeDinnerApp")
        .factory("OrderService", OrderService);

    function OrderService($http, $q) {

        var api = {
            placeOrder: placeOrder

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


    }
})();