module.exports = function(mongoose) {
    var DishSchema = mongoose.Schema({
        title: String,
        cuisine: String,
        type: String,
        price: Number,
        quantity: Number,
        ingredients: String,
        img: String,
        chef: String,
        user: String
    }, {collection: "project.dish"});

    return DishSchema;
}