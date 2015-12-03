module.exports = function(app, model) {

    app.get("/api/project/dish/username=:username", filterDishByUsername);
    app.get("/api/project/dish", findAllDishes);
    app.post("/api/project/dish", createDish);
    app.put("/api/project/dish/:id", updateUser);
    app.delete("/api/project/dish/:id", deleteDish);

    function filterDishByUsername(req, res) {
        var username = req.params.username;
        model
            .filterDishByUsername(username)
            .then(function(dish){
                console.log(dish);
                res.json(dish);
            });
    }

    function findAllDishes(req, res) {
        model
            .findAllDishes()
            .then(function(dishes) {
                res.json(dishes);
            });
    }

    function createDish(req, res) {
        var newDish = req.body;
        model
            .createDish(newDish)
            .then(function(dishes) {
                res.json(dishes);
            });
    }

    function deleteDish(req, res) {
        var dishId = req.params.id;
        model
            .deleteDish(dishId)
            .then(function(dishes){
                res.json(dishes);
            });
    }

    function updateUser(req,res) {
        var dishId = req.params.id;
        var dishObj = req.body;
        model
            .updateUser(dishId, dishObj)
            .then(function(dish){
                res.json(dish);
            });
    }
}