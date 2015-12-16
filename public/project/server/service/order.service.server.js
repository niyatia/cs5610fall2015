module.exports = function(app, model, paypal, transporter) {

    app.post("/api/project/order", createDish);
    app.get("/api/project/order/customerId=:customerId", findOrdersByCustomerId);
    app.get("/api/project/order/driverId=:driverId", findOrdersByDriverId);
    app.get("/api/project/order/chefname=:chefname", findOrders);
    app.put("/api/project/order/orderId=:orderId", updateOrder);

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
            "last_name":  newOrder.creditCardDetails.lastname
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
                                customerEmail: newOrder.customerEmail,
                                dishes: newOrder.dishes,
                                totalAmount: newOrder.totalAmount,
                                creditCardId: credit_card.id,
                                paymentId : payment.id
                                 }

                            model
                                .createOrder(order)
                                .then(function(newOrder) {
                                    console.log("payment done");
                                    var mailToCustomer = {
                                        from: 'homemadedinnerapp@gmail.com', // sender address
                                        to: order.customerEmail, // list of receivers
                                        subject: 'Your dinner is on the way!', // Subject line
                                        text: 'Thank you for the order. Your dinner will arrive to you between 5pm to 7pm' // plaintext body
                                    };

                                    // send mail with defined transport object
                                    transporter.sendMail(mailToCustomer, function(error, info){
                                        if(error){
                                            return console.log(error);
                                        }
                                        console.log('Message sent: ' + info.response);

                                    });

                                    var mailToDriver = {
                                        from: 'homemadedinnerapp@gmail.com', // sender address
                                        to: order.driverEmail, // list of receivers
                                        subject: 'You have new Order to deliver!', // Subject line
                                        text: 'Please deliver the order'+ order._id +'from chef address to customer address. ' +
                                        'Check http://localhost:3000/project/client/#/driver-home for more details.' // plaintext body
                                    };

                                    // send mail with defined transport object
                                    transporter.sendMail(mailToDriver, function(error, info){
                                        if(error){
                                            return console.log(error);
                                        }
                                        console.log('Message sent: ' + info.response);

                                    });
                                    res.json(order);
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

    function findOrdersByDriverId(req,res){
        var driverId = req.params.driverId;
        console.log(driverId);
        model
            .findOrdersByDriverId(driverId)
            .then(function(myOrders){
                console.log(myOrders);
                res.json(myOrders);
            });
    }


    function findOrders(req,res){
        var chefname = req.params.chefname;
        console.log(chefname);
        model
            .findOrders(chefname)
            .then(function(myOrders){
                console.log(myOrders);
                res.json(myOrders);
            });
    }

    function updateOrder(req, res){
        var orderId = req.params.orderId;
        var order = req.body;
        model
            .updateOrder(orderId, order)
            .then(function(myOrders){
                res.json(myOrders);
            });
    }
}