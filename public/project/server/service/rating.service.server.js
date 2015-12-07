module.exports = function(app, model, paypal) {

    app.post("/api/project/rating", createRating);
    app.get("/api/project/rating/dishId=:dishId", findRatingsByDishId);

    function createRating(req, res) {
        var rating = req.body;

        model
            .createRating(rating)
            .then(function(newRating) {
                console.log("rating done");
                res.json(newRating);
            });
    }

    function findRatingsByDishId(req,res){
        var dishId = req.params.dishId;
        console.log(dishId);
        model
            .findRatingsByDishId(dishId)
            .then(function(myRatings){
                console.log(myRatings);
                res.json(myRatings);
            });
    }
}