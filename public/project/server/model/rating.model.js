var q = require("q");

module.exports = function(mongoose, db){
    var RatingSchema =  require("./rating.schema.js")(mongoose);

    var ratingModel = mongoose.model("ratingModel", RatingSchema);

    var api = {
        createRating: createRating,
        findRatingsByDishId : findRatingsByDishId
    };

    return api;

    function createRating(newRating) {
        var deferred = q.defer();
        console.log("creating new rating");
        console.log(newRating);
        ratingModel.create(newRating, function(err, ratings){
            console.log("created rating");
            console.log(ratings);
            deferred.resolve(ratings);
        });

        return deferred.promise;
    }

    function findRatingsByDishId(dishId){
        var deferred = q.defer();

        ratingModel.find({dishId: dishId}, function(err, ratings){
            console.log(ratings);
            deferred.resolve(ratings);
        });

        return deferred.promise;
    }
}