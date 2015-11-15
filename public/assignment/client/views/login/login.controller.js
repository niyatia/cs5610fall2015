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
                    console.log("test1");
                    if (user != null) {
                        console.log(user);
                        $rootScope.user = user;
                        $location.url("/profile");
                    }
                }
            )};
    }
})();