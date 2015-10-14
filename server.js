"use strict";

var express = require('express');
var app = express();

var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');

var db = require('./database.js');

// app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// database initialisation
db.initialisation();

http.createServer(app).listen(3000);
