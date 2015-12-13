var q = require("q");

module.exports = function(mongoose, db){
    var DishSchema =  require("./dish.schema.js")(mongoose);

    var dishModel = mongoose.model("dishModel", DishSchema);

    var api = {
        filterDishByUsername: filterDishByUsername,
        findAllDishes: findAllDishes,
        findDishById: findDishById,
        getCuisines : getCuisines,
        getTypes : getTypes,
        createDish: createDish,
        deleteDishById: deleteDishById,
        updateDish: updateDish,
        updateDishQuantity : updateDishQuantity
    };

    return api;

    function filterDishByUsername(username) {

        var deferred = q.defer();
        dishModel.find({chef: username}, function(err, dishes){
            deferred.resolve(dishes);
        });
        return deferred.promise;
    }

    function findAllDishes() {
        var deferred = q.defer();
        dishModel.find({quantity: {$gt: 0}}, function(err, dishes){
            deferred.resolve(dishes);
        });
        return deferred.promise;
    }

    function findDishById(dishId) {
        var deferred = q.defer();
        dishModel.findOne({_id: dishId}, function(err, dish){
            deferred.resolve(dish);
        });
        return deferred.promise;
    }

    // Returns all the cuisine
    function getCuisines() {
        var deferred = q.defer();
        deferred.resolve(dishModel.schema.path('cuisine').enumValues);
        return deferred.promise;
    }

    // Returns all the types
    function getTypes() {
        var deferred = q.defer();
        deferred.resolve(dishModel.schema.path('type').enumValues);
        return deferred.promise;
    }

    function createDish(newDish) {
        var deferred = q.defer();

        dishModel.create(newDish, function(err, dishes){
            deferred.resolve(dishes);
        });

        return deferred.promise;
    }

    function deleteDishById(dishId) {

        var deferred = q.defer();
        dishModel.remove({_id: dishId},function(err, dishes){
            deferred.resolve(dishes);
        });
        return deferred.promise;
    }

    function updateDish(dishId, newDish) {

        var deferred = q.defer();

        delete newDish._id;
        console.log(newDish);

        dishModel.update({_id: dishId}, {$set: newDish},
            function(err,dish){
                deferred.resolve(dish);
            });

        return deferred.promise;
    }

    function updateDishQuantity(dishId, quantity) {

        var deferred = q.defer();
        console.log("in dish model");
        dishModel.findOne({_id: dishId}, function(err, dish){
            console.log("found dish");
            dish.quantity = dish.quantity - quantity;
            if(dish.quantity == 0){
                dishModel.remove({_id: dishId},function(err, dishes){
                    deferred.resolve(dishes);
                });
            }
            else{
                delete dish._id;
                dishModel.update({_id: dishId}, {$set: dish},
                    function(err,dish){
                        deferred.resolve(dish);
                    });
            }
        });
        return deferred.promise;
    }
}