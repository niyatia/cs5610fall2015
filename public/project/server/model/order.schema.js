module.exports = function(mongoose) {
    var DishSchema = require ("./dish.schema.js") (mongoose);
    var OrderSchema = mongoose.Schema({
        customerId: String,
        customerEmail : String,
        driverId : String,
        driverEmail : String,
        dishes: [DishSchema],
        totalAmount: Number,
        creditCardId: String,
        paymentId: String,
        status: {type: String, enum : ["ordered", "delivered"]},
        created:  { type: Date, default: Date.now }
    }, {collection: "project.order"});

    return OrderSchema;
}