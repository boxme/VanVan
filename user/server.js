'use strict';

var express = require('express');
var app = express();

var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');

var db = require('../database.js');
var schema = require('./data/schema.js');

// app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// database initialisation
var userDbModel = require('./models/index.js');
db.initialisation(schema.userSchema, userDbModel);

http.createServer(app).listen(3000);
