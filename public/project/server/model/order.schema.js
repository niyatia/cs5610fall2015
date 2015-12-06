module.exports = function(mongoose) {
    var DishSchema = require ("./dish.schema.js") (mongoose);
    var OrderSchema = mongoose.Schema({
        customerId: String,
        dishes: [DishSchema],
        totalAmount: Number,
        creditCardId: String,
        paymentId: String

    }, {collection: "project.order"});

    return OrderSchema;
}