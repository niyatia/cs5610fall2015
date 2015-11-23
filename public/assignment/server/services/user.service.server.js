module.exports = function(app, model) {
    app.get("/api/assignment/user/username=:username&password=:password", findUserByUsernameAndPassword);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/username=:username", findUserByUsername);
    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

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
            .then(function(user){
                res.json(user);
            });
    }

    function findUserByUsernameAndPassword(req, res) {
        var username = req.params.username;
        var pwd = req.params.password;
        var credentials = {
            username: username,
            password: pwd
        };
        model
            .findUserByCredentials(credentials)
            .then(function(user){
                console.log(user);
                res.json(user);
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

    function findUserById(req, res){
        var userId = req.params.id;
        model
            .findUserById(userId)
            .then(function(user){
                res.json(user);
            });
    }

    function updateUser(req, res) {

        console.log(req.params.id);
        console.log(req.body);
        var userId = req.params._id;
        var userObj = req.body;
        model
            .updateUser(userId, userObj)
            .then(function(user){
                res.json(user);
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

};