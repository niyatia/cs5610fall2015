module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        "fullname": String,
        "username" : String,
        "password" : String,
        "phone": String,
        "carId" : String,
        "licenseId" : String,
        "address": String,
        "zip": Number,
        "email": String,
        "userType": Number
    }, {collection: "project.user"});

    return UserSchema;
}