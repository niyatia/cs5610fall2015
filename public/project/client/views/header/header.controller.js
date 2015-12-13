"use strict";
(function(){

         angular
        .module("HomeMadeDinnerApp")
        .controller("HeaderController", HeaderController);

      function HeaderController($scope, $location, $rootScope, UserService) {
          var model = this;
         $scope.$location = $location;
          console.log("in header");
          model.logout = logout;

          function logout() {
              UserService
                  .logout()
                  .then(function () {
                      $rootScope.loggedInUser = null;
                      $location.url("/home");
                  });
          }
    }
})();