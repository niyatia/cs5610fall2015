module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        "fullname": String,
        "username" :  { type: String, unique: true },
        "password" : String,
        "phone": Number,
        "carId" : String,
        "licenseId" : String,
        "address": String,
        status: {type: String, enum : ["available", "unavailable"]},
        "zip": Number,
        "email": String,
        "userType": Number,
        "created" :  { type: Date, default: Date.now }
    }, {collection: "project.user"});

    return UserSchema;
}