'use strict';

const express = require('express');
const app = express();

const http = require('http');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const multer = require('multer');

const db = require('./database.js');
const schema = require('./models/user/schema.js');

// Handle a text-only multipart form
app.use(multer().array());

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// database initialisation
const userDbModel = require('./models/index.js');
db.initialisation(schema.userSchema, userDbModel);

const server = http.createServer(app);
const socketIO = require('./socket/socket.js').listen(server);
server.listen(3000);

const api = require('./routes/api.js');
api(app, socketIO);
