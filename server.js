var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610-assignment');

var db = mongoose.connection;
var express = require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// GET
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());//for parsing multipart/form-data

require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port,ipaddress);