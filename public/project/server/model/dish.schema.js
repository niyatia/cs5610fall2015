module.exports = function(mongoose) {
    var DishSchema = mongoose.Schema({
        title: { type: String, unique: true },
        cuisine: String,
        type: String,
        price: Number,
        quantity: Number,
        ingredients: String,
        image: Buffer,
        chef: String,
        user: String,
        rating: Number
    }, {collection: "project.dish"});

    return DishSchema;
}