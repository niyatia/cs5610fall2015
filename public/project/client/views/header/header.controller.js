"use strict";
(function(){

         angular
        .module("HomeMadeDinnerApp")
        .controller("HeaderController", HeaderController);

      function HeaderController($scope, $location, $rootScope, UserService) {
          var model = this;
         $scope.$location = $location;
          console.log("in header");

          model.home = home;

          function home(){
              $location.url("/home");
          }

          model.profile = profile;

          function profile(){
              console.log($rootScope.loggedInUser);
              if($rootScope.loggedInUser){
                  if($rootScope.loggedInUser.userType == 0){
                      $location.url("/user-profile");
                  }
                  if($rootScope.loggedInUser.userType == 1){
                      console.log("inside chef profile");
                      $location.url("/chef-profile");
                  }
                  if($rootScope.loggedInUser.userType == 2){
                      $location.url("/driver-profile");
                  }
              }
          }

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