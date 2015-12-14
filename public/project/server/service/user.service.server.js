module.exports = function(app, model, passport) {
    var auth = function(req, res, next)
    {
        if (!req.isAuthenticated())
            res.send(401);
        else
            next();
    };

    app.post("/api/project/user/login", passport.authenticate('local'), findUserByCredentials);
    app.get("/api/project/user/username=:username", auth, findUserByUsername);
    app.get("/api/project/user/userId=:userId", auth, findUserById);
    app.get("/api/project/user", auth, findAllUsers);
    app.post("/api/project/user/logout", auth, logout);
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", auth, updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/user/loggedin", getLoggedInUser);

    function getLoggedInUser (req, res) {
        console.log("inside loggedIn");
        console.log(req.isAuthenticated());
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function findUserByCredentials(req, res) {
        var username = req.body.username;
        var pwd = req.body.password;
        var credentials = {
            username: username,
            password: pwd
        };
        console.log(credentials);
        model
            .findUserByCredentials(credentials)
            .then(function(user){
                console.log(user);
                res.json(user);
            });
    }

    function logout (req, res) {
        console.log("logging out");
        req.logOut();
        res.send(200);
    }

    function findAllUsers(req, res) {
        model
            .findAllUsers()
            .then(function(users){
                res.json(users);
                console.log(users);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        model
            .findUserByUsername(username)
            .then(function(users){
                res.json(users);
                console.log(users);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model
            .findUserById(userId)
            .then(function(users){
                res.json(users);
                console.log("inside user service server");
                console.log(users);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        model
            .createUser(user)
            .then(function(users){
                res.json(users);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        model
            .deleteUser(userId)
            .then(function(users){
                res.json(users);
            });
    }

    function updateUser(req, res) {
        console.log(req.params.id);
        console.log(req.body);
        var userId = req.params.id;
        var userObj = req.body;
        model
            .updateUser(userId, userObj)
            .then(function(user){
                res.json(user);
            });
    }
}