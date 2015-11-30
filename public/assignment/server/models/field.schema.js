module.exports = function (mongoose) {
    var FieldSchema = mongoose.Schema ({
        label : String,
        fieldType : {
            type : String,
            enum : ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES", "OPTIONS", "DATE"]
        },
        options : [
            {
                label : String,
                value : String
            }
        ],
        placeholder : String
    });

    return FieldSchema;
};