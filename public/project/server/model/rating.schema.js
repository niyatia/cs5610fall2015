module.exports = function(mongoose) {

    var RatingSchema = mongoose.Schema({
        customerId: String,
        dishId: String,
        rating: Number,
        chef: String,
        created:  { type: Date, default: Date.now }

    }, {collection: "project.rating"});

    return RatingSchema;
}