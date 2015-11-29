module.exports = function(mongoose) {
    var FormSchema = mongoose.Schema({
        "title": String,
        "userId" : String
    }, {collection: "cs5610.assignment.form"});

    return FormSchema;
};