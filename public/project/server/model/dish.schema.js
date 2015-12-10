module.exports = function(mongoose) {
    var DishSchema = mongoose.Schema({
        title: { type: String, unique: true },
        "type": {type: String, enum: ["Vegetarian", "Non-Vegetarian", "Gluten-Free", "Vegan"], index: true},
        "cuisine": {type: String, enum: ["Indian", "Thai", "Italian", "Chinese", "Mexican", "Other"]},
        price: Number,
        quantity: Number,
        ingredients: String,
        image: String,
        chef: String,
        chefEmail: String,
        rating: Number
    }, {collection: "project.dish"});

    return DishSchema;
}