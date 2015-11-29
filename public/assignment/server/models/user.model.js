var q = require("q");

module.exports = function(mongoose, db){

    var UserSchema = require('./user.schema.js')(mongoose);
    var userModel = mongoose.model("userModel", UserSchema);

    var api = {
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findAllUsers: findAllUsers,
        deleteUser : deleteUser,
        createUser : createUser,
        updateUser: updateUser
    };
    return api;

    function findUserById(userId) {
        var deferred = q.defer();
        userModel.findById({_id: userId}, function(err, user){
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();
        userModel.findOne({username: credentials.username, password: credentials.password}, function(err, users){
            console.log(users);
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {

        var deferred = q.defer();
        userModel.findOne({username: username}, function(err, users){
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function findAllUsers() {

        var deferred = q.defer();
        userModel.find(function(err, users){
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function deleteUser(userId) {

        var deferred = q.defer();
        userModel.remove({_id: userId},function(err, users){
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function createUser(newUser) {
        var deferred = q.defer();
        var newUser = newUser;

        userModel.create(newUser, function(err, users){
                deferred.resolve(users);
        });

        return deferred.promise;
    }

    function updateUser(userId, userObj) {

        var deferred = q.defer();

       delete userObj._id;
        console.log(userObj);

        userModel.update({_id: userId}, {$set: userObj}, function(err, user) {
            if(err) {
                console.log("Cud not find Usr!!");
                deferred.reject(err);
            } else {
                console.log("Update successful!");
                userModel.findById(userId, function(err,usr) {
                    console.log(usr);
                    deferred.resolve(usr);
                });
            }
        });

        return deferred.promise;
    }
};