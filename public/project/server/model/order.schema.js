module.exports = function(mongoose) {

    var OrderSchema = mongoose.Schema({
        customerId: String,
        dishes: [String],
        totalAmount: Number,
        creditCardId: String,
        paymentId: String

    }, {collection: "project.order"});

    return OrderSchema;
}