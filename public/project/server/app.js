module.exports = function(app, db, mongoose) {

    var userModel = require("./model/user.model.js") (mongoose, db);
    require("./service/user.service.server.js")(app, userModel);

    var dishModel = require("./model/dish.model.js") (mongoose, db);
    require("./service/dish.service.server.js")(app, dishModel);
};