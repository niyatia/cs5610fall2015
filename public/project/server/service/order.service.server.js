module.exports = function(app, model, paypal) {

    app.post("/api/project/order", createDish);
    app.get("/api/project/order/customerId=:customerId", findOrdersByCustomerId);

    function createDish(req, res) {
        var newOrder = req.body;
        console.log(newOrder.creditCardDetails.expiry);

        var card_data = {
            "type": newOrder.creditCardDetails.type,
            "number": newOrder.creditCardDetails.cardNumber,
            "expire_month": newOrder.creditCardDetails.expire_month,
            "expire_year":  newOrder.creditCardDetails.expire_year,
            "cvv2":  newOrder.creditCardDetails.cvv,
            "first_name":  newOrder.creditCardDetails.firstname,
            "last_name":  newOrder.creditCardDetails.lastname,
            "billing_address": {
                "line1": "52 N Main ST",
                "city": "Johnstown",
                "state": "OH",
                "postal_code": "43210",
                "country_code": "US"
            }
        };

        paypal.creditCard.create(card_data, function(error, credit_card){
            if (error) {
                console.log("error in credit card");
                console.log(error);
                res.json({error: "VALIDATION_ERROR"});
            } else {
                console.log("Create Credit-Card Response");
                console.log(credit_card);
                if(credit_card.body != null && credit_card.body.name == "VALIDATION_ERROR"){
                    res.json({error: "VALIDATION_ERROR"});
                }
                else {
                    var create_payment_json = {
                        "intent": "sale",
                        "payer": {
                            "payment_method": "credit_card",
                            "funding_instruments": [{
                                "credit_card": card_data
                            }]
                        },
                        "transactions": [{
                            "amount": {
                                "total": newOrder.totalAmount,
                                "currency": "USD"
                            },
                            "description": "This is the payment transaction description."
                        }]
                    };

                    paypal.payment.create(create_payment_json, function (error, payment) {
                        if (error) {
                            console.log("payment error");
                            console.log(error);
                            res.json({error: "PAYMENT_ERROR"});
                        } else {
                            console.log("Create Payment Response");
                            console.log(payment);

                            var order = {
                                customerId: newOrder.customerId,
                                dishes: newOrder.dishes,
                                totalAmount: newOrder.totalAmount,
                                creditCardId: credit_card.id,
                                paymentId : payment.id
                                 }

                            model
                                .createOrder(order)
                                .then(function(newOrder) {
                                    console.log("payment done");
                                    res.json(payment);
                                });

                        }
                    });


                }
            }
        })
    }

    function findOrdersByCustomerId(req,res){
        var customerId = req.params.customerId;
        console.log(customerId);
        model
            .findOrdersByCustomerId(customerId)
            .then(function(myOrders){
                console.log(myOrders);
                res.json(myOrders);
            });
    }
}