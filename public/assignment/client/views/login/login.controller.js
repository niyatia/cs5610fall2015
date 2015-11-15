(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        var model = this;
        model.login = login;

        function login() {
            var username = model.username;
            var pwd = model.password;
            UserService.findAllUsers()
                .then(function(user){
                    console.log("test1");
                    if (user != null) {
                        $rootScope.username = user.username;
                        $rootScope.password = user.password;
                        $rootScope.id = user.id;
                        $rootScope.email = user.email;
                        $rootScope.firstname = user.firstName;
                        $rootScope.lastname = user.lastName;
                        $location.url("/profile");
                    }
                }
            )};

    }
})();