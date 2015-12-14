"use strict";
var q = require("q");

module.exports = function(mongoose, db, passport, localStrategy){

    var UserSchema = require("./user.schema.js")(mongoose);

    var userModel = mongoose.model("user", UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserByUsername : findUserByUsername,
        findUserById : findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    passport.use(new localStrategy(
        function(username, password, done)
        {
            console.log("inside passport.use");
            console.log(username);
            console.log(password);
            userModel.findOne({username: username, password: password}, function(err, user)
            {
                console.log(err);
                console.log(user);
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            })
        }));

    passport.serializeUser(function(user, done)
    {
        console.log("inside passport.serialize");
        done(null, user);
    });

    passport.deserializeUser(function(user, done)
    {
        console.log("inside passport.deserialize");
        userModel.findById(user._id, function(err, user)
        {
            done(err, user);
        });
    });

    return api;

    function findUserByCredentials(credentials) {

        var deferred = q.defer();
        userModel.findOne({username: credentials.username, password: credentials.password}, function(err, users){
            console.log(users);
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

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username : username},function(err, users){
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        userModel.findOne({_id : id},function(err, users){
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