(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .controller("SidebarController", function($scope, $location){
            $scope.$location = $location;
        });
})();