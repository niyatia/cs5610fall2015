"use strict";
(function(){
    angular
        .module("HomeMadeDinnerApp")
        .controller("DriverHomeController", DriverHomeController);

    function DriverHomeController($scope, $rootScope, $location, OrderService, UserService) {

        var model = this;

        model.driver = $rootScope.loggedInUser;
        getMyUpcomingDeliveries();

        function getMyUpcomingDeliveries(){
            OrderService.findOrderByDriverId($rootScope.loggedInUser._id)
                .then(function(myOrders){
                    console.log(myOrders);
                    var upcomingOrder = [];
                    var completedOrders = [];
                    for(var i = 0; i < myOrders.length; i++){
                        if(myOrders[i].status == "delivered"){
                            completedOrders.push(myOrders[i]);
                        }
                        else if(myOrders[i].status == "ordered"){
                            upcomingOrder.push(myOrders[i]);
                        }
                    }

                    model.upcomingOrder = upcomingOrder[0];
                    model.completedOrders = completedOrders;
                    if(model.upcomingOrder){
                        UserService.findUserByUsername(model.upcomingOrder.dishes[0].chef)
                            .then(function(chef){
                                model.chef = chef;
                                UserService.findUserById(model.upcomingOrder.customerId)
                                    .then(function(customer){
                                        console.log(customer);
                                        model.customer = customer;
                                    });
                            });
                    }
                });
        }

        model.delivered = delivered;

        function delivered(){
            model.upcomingOrder.status = "delivered";
            console.log("inside controller");
            console.log(model.driver._id);
            console.log(model.upcomingOrder);
            OrderService.updateOrder(model.upcomingOrder._id, model.upcomingOrder)
                .then(function(myOrders){
                    model.completedOrders = myOrders;
                });
        }

    }

})();