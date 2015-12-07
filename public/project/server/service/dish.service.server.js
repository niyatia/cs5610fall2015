module.exports = function(app, model) {

    app.get("/api/project/dish/username=:username", filterDishByUsername);
    app.get("/api/project/dish", findAllDishes);
    app.get("/api/project/dish/dishId=:dishId", findDishById);
    app.post("/api/project/dish", createDish);
    app.put("/api/project/dish/:id", updateDish);
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

    function findDishById(req, res) {
        var dishId = req.params.dishId;
        console.log(dishId);
        model
            .findDishById(dishId)
            .then(function(dish){
                console.log(dish);
                res.json(dish);
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

    function updateDish(req,res) {
        var dishId = req.params.id;
        console.log(dishId);
        var dishObj = req.body;
        console.log(dishObj);
        model
            .updateDish(dishId, dishObj)
            .then(function(dish){
                res.json(dish);
            });
    }
}