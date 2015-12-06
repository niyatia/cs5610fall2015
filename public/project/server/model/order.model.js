var q = require("q");

module.exports = function(mongoose, db){
    var OrderSchema =  require("./order.schema.js")(mongoose);

    var orderModel = mongoose.model("orderModel", OrderSchema);

    var api = {
        createOrder: createOrder,
        findOrdersByCustomerId : findOrdersByCustomerId
    };

    return api;

    function createOrder(newOrder) {
        var deferred = q.defer();
        console.log("creating new order");
        console.log(newOrder);
        orderModel.create(newOrder, function(err, orders){
            console.log("created order");
            console.log(orders);
            deferred.resolve(orders);
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
}