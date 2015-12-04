module.exports = function(app, model, paypal) {

    app.post("/api/project/order", createDish);

    function createDish(req, res) {
        var newOrder = req.body;

        var card_data = {
            "type": "visa",
            "number": "4417119669820331",
            "expire_month": "11",
            "expire_year": "2018",
            "cvv2": "123",
            "first_name": "Joe",
            "last_name": "Shopper"
        };

        paypal.creditCard.create(card_data, function(error, credit_card){
            if (error) {
                console.log(error);
                throw error;
            } else {
                console.log("Create Credit-Card Response");
                console.log(credit_card);
            }
        })

        model
            .createOrder(newOrder)
            .then(function(newOrder) {
                res.json(newOrder);
            });
    }
}