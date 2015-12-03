module.exports = function(mongoose) {

    var CreditCardSchema = mongoose.Schema({
        cardNumber : Number,
        cardHolderName : String,
        expiry: Date,
        cvv : Number,
        userId: String

    }, {collection: "project.creditCard"});

    return CreditCardSchema;
}