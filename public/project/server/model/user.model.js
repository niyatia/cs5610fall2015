"use strict";
var q = require("q");

module.exports = function(mongoose, db){

    var UserSchema = mongoose.Schema({
        "firstName": String,
        "lastName" : String,
        "username" : String,
        "password" : String,
        "phone": String,
        "address": String,
        "zip": Number,
        "email": String,
        "userType": Number
    }, {collection: "user"});

    var userModel = mongoose.model("userModel", UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;

    function findUserByCredentials(credentials) {

        var deferred = q.defer();
        userModel.findOne({username: credentials.userName, password: credentials.password}, function(err, users){
            console.log(users);
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function findAllUsers(callback) {
        var deferred = q.defer();
        userModel.find(function(err, users){
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

    function deleteUserById(userId) {

        var deferred = q.defer();
        userModel.remove({_id: userId},function(err, users){
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function updateUser(userId, newUser) {

        var deferred = q.defer();

        delete newUser._id;
        console.log(newUser);

        userModel.update({_id: userId}, {$set: newUser},
            function(err,user){
                console.log(user);
                deferred.resolve(user);
            });

        return deferred.promise;
    }
};