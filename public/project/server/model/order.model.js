var q = require("q");

module.exports = function(mongoose, db){
    var OrderSchema =  require("./order.schema.js")(mongoose);

    var orderModel = mongoose.model("orderModel", OrderSchema);

    var api = {

        createOrder: createOrder
    };

    return api;

    function createOrder(newOrder) {
        var deferred = q.defer();

        orderModel.create(newOrder, function(err, orders){
            deferred.resolve(orders);
        });

        return deferred.promise;
    }
}