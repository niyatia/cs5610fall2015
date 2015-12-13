"use strict";
(function(){

         angular
        .module("HomeMadeDinnerApp")
        .controller("HeaderController", HeaderController);

      function HeaderController($scope, $location, $rootScope, UserService) {
          var model = this;
         $scope.$location = $location;
         $scope.loggedInUser = $rootScope.loggedInUser;
          console.log("in header");
          console.log($scope.loggedInUser);
          model.logout = logout;

          function logout() {
              UserService
                  .logout()
                  .then(function () {
                      $rootScope.currentUser = null;
                      $location.url("/home");
                  });
          }
    }
})();