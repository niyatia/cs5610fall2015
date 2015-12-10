var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var paypal = require('paypal-rest-sdk');
var nodemailer = require('nodemailer');
var multipart = require('connect-multiparty');
app.use(multipart({
    uploadDir: "./public/project/uploads"
}));
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'homemadedinnerapp@gmail.com',
        pass: 'homemadedinner'
    }
}, {
    // default values for sendMail method
    from: 'homemadedinnerapp@gmail.com',
    headers: {
        'My-Header': 'Home-made Dinner'
    }
});

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AY6kks-uafhNV1qzbc7kxxrvX4-qfST8O7O46HPl4r8U6apsC6C_xGAwhyDh5lQ6ICvdmXiNjGpR8dvG',
    'client_secret': 'EL2_owUzMTztBqhoJsldAOt6cNHz1Fwcxt2311FS_Hm8XUOqoOFMFcXBEcpOvNSxkPewjNBBajicESPl'
});
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);
// GET
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json({limit: '50mb'}));// for parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: false})); // for parsing application/x-www-form-urlencoded
app.use(multer());//for parsing multipart/form-data

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose, paypal, transporter, multipart);

app.listen(port,ipaddress);