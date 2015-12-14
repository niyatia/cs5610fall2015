var q = require("q");

module.exports = function(mongoose, db){
    var OrderSchema =  require("./order.schema.js")(mongoose);
    var DriverSchema = require("./user.schema.js")(mongoose);
    var orderModel = mongoose.model("orderModel", OrderSchema);
    var driverModel = mongoose.model("driverModel", DriverSchema);

    var api = {
        createOrder: createOrder,
        findOrdersByCustomerId : findOrdersByCustomerId,
        findOrdersByDriverId : findOrdersByDriverId,
        findOrders : findOrders,
        updateOrder : updateOrder
    };

    return api;

    function createOrder(newOrder) {
        var deferred = q.defer();
        console.log("creating new order");
        console.log(newOrder);
        driverModel.findOneAndUpdate({'status' : 'available'}, { $set: { status: 'unavailable' }}, function(err, driver){
            console.log(driver);
            newOrder.driverId = driver._id;
            newOrder.driverEmail = driver.email;
            newOrder.status = "ordered";
            orderModel.create(newOrder, function(err, orders){
                console.log("created order");
                console.log(orders);
                deferred.resolve(orders);
            });
        });
        return deferred.promise;
    }

    function findOrdersByCustomerId(customerId){
        var deferred = q.defer();

        orderModel.find({customerId: customerId}, function(err, orders){
            console.log(orders);
            deferred.resolve(orders);
        });

        return deferred.promise;
    }

    function findOrdersByDriverId(driverId){
        var deferred = q.defer();

        orderModel.find({driverId: driverId}, function(err, orders){
            console.log(orders);
            deferred.resolve(orders);
        });

        return deferred.promise;
    }

    function findOrders(chefname){
        var deferred = q.defer();

        orderModel.find({'dishes.chef': chefname}, function(err, orders){
            console.log(orders);
            deferred.resolve(orders);
        });

        return deferred.promise;
    }

    function updateOrder(orderId, order){
        var deferred = q.defer();

        delete order._id;
        console.log(order);

        orderModel.update({_id: orderId}, {$set: order},
            function(err,updatedOrder){
                driverModel.findOneAndUpdate({'_id' : order.driverId}, { $set: { status: 'available' }}, function(err, driver){
                    orderModel.find({driverId: order.driverId}, function(err, orders){
                        console.log(orders);
                        deferred.resolve(orders);
                    });
                });
            });

        return deferred.promise;
    }
}