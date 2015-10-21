(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .controller("HeaderController", function($scope, $location){
            $scope.$location = $location;
        });
})();