'use strict';

var express = require('express');
var app = express();

var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');

// app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

http.createServer(app).listen(3000);
