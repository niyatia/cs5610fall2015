module.exports = function(app, model) {
    app.get("/api/project/user/username=:username&password=:password", findUserByUsernameAndPassword);
    app.get("/api/project/user", findAllUsers);
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

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

    function findAllUsers(req, res) {
        model
            .findAllUsers()
            .then(function(users){
                res.json(users);
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