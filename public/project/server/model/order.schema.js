module.exports = function(mongoose) {
    var DishSchema = require ("./dish.schema.js") (mongoose);
    var OrderSchema = mongoose.Schema({
        orderId: String,
        customerId: String,
        dishes: [DishSchema],
        totalAmount: Number,
        creditCardId: Number

    }, {collection: "project.order"});

    return OrderSchema;
}