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
            UserService.findUserByUsernameAndPassword(username, pwd)
                .then(function(user){

                    if (user != null) {
                        $rootScope.user = user;
                        $location.url("/profile");
                    }
                }
            )};
    }
})();