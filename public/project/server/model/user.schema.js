module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        "fullname": String,
        "username" :  { type: String, unique: true },
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