var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// GET
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json

require("./public/assignment/server/services/user.service.server.js")(app);
require("./public/assignment/server/services/form.service.server.js")(app);
//require("./public/assignment/server/services/field.service.js")(app);

app.listen(port,ipaddress);