'use strict';

var express = require('express');
var app = express();

var http = require('http');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var multer = require('multer');

var db = require('./database.js');
var schema = require('./models/user/schema.js');

// Handle a text-only multipart form
app.use(multer().array());

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// database initialisation
var userDbModel = require('./models/index.js');
db.initialisation(schema.userSchema, userDbModel);

http.createServer(app).listen(3000);

var api = require('./routes/api.js');
api(app);
