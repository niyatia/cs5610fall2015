"use strict";
(function(){
    angular
        .module("HomeMadeDinnerApp")
        .controller("DriverProfileController", DriverProfileController);

    function DriverProfileController($scope, $rootScope, $location, UserService) {

        var upcomingDeliveries = [{when: "15-Nov-2015, 5PM",
                                   from: "2230 4th Ave Seattle 98121",
                                    to: "2450 Aurora Ave Seattle 98109",
                                    contactPerson: "Niyati",
                                    contactNumber: 2062678838},
                                    {when: "16-Nov-2015, 5PM",
                                    from: "223 5th Ave, Seattle 98121",
                                    to: "250 Aurora Ave N, Seattle 98109",
                                    contactPerson: "Hiral",
                                    contactNumber: 2062678821}];

        var completedDeliveries = [{when: "12-Nov-2015, 5PM",
                                    from: "2230 4th Ave Seattle 98121",
                                    to: "2450 Aurora Ave Seattle 98109",
                                    contactPerson: "Niyati",
                                    contactNumber: 2062678838},
                                        {when: "11-Nov-2015, 5PM",
                                        from: "223 5th Ave, Seattle 98121",
                                        to: "250 Aurora Ave N, Seattle 98109",
                                        contactPerson: "Hiral",
                                        contactNumber: 2062678821}];

        $scope.upcomingDeliveries = upcomingDeliveries;
        $scope.completedDeliveries = completedDeliveries;

    }

})();