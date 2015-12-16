module.exports = function(app, model, multipart) {

    app.get("/api/project/dish/username=:username", filterDishByUsername);
    app.get("/api/project/dish", findAllDishes);
    app.get("/api/project/dish/search=:keyword", findDishByKeyword);
    app.get("/api/project/dish/dishId=:dishId", findDishById);
    app.get("/api/project/dish/cuisine", getCuisines);
    app.get("/api/project/dish/type", getTypes);
    app.post("/api/project/dish", createDish);
    app.put("/api/project/dish/:id", updateDish);
    app.delete("/api/project/dish/:id", deleteDish);

    function filterDishByUsername(req, res) {
        var username = req.params.username;
        model
            .filterDishByUsername(username)
            .then(function(dish){
                res.json(dish);
            });
    }

    function findDishByKeyword(req, res) {
        var keyword = req.params.keyword;
        model
            .findDishByKeyword(keyword)
            .then(function(dish){
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
                res.json(dish);
            });
    }

    function getCuisines(req, res) {
        model
            .getCuisines()
            .then(function(cuisine){
                res.json(cuisine);
            });
    }

    function getTypes(req, res) {
        model
            .getTypes()
            .then(function(types){
                res.json(types);
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
            .deleteDishById(dishId)
            .then(function(dishes){
                res.json(dishes);
            });
    }

    function updateDish(req,res) {
        var dishId = req.params.id;
        console.log(dishId);
        var dishObj = req.body;
        model
            .updateDish(dishId, dishObj)
            .then(function(dish){
                res.json(dish);
            });
    }

}