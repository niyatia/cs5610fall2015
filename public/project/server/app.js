module.exports = function(app, db, mongoose, paypal, transporter, multipart) {

    var userModel = require("./model/user.model.js") (mongoose, db);
    require("./service/user.service.server.js")(app, userModel);

    var dishModel = require("./model/dish.model.js") (mongoose, db);
    require("./service/dish.service.server.js")(app, dishModel, multipart);

    var orderModel = require("./model/order.model.js") (mongoose, db);
    require("./service/order.service.server.js")(app, orderModel, paypal, transporter);

    var ratingModel = require("./model/rating.model.js") (mongoose, db);
    require("./service/rating.service.server.js")(app, ratingModel);


};