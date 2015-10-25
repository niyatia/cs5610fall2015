(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope) {
        $scope.user = $rootScope.user;
        $scope.$location = $location;
        $scope.update = update();
        function update(){
            console.log("Testing  Profile");
        }
    }


})();