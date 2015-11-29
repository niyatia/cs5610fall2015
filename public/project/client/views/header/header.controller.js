"use strict";
(function(){

         angular
        .module("HomeMadeDinnerApp")
        .controller("HeaderController", HeaderController);

      function HeaderController($scope, $location) {
         $scope.$location = $location;
    }
})();