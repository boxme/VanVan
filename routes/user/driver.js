'use strict';

var root = '../';
var driverController = {};
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var collections = require(root + root + 'models/user/collection.js');

var errorCallback = function errorCallback(res, statusCode) {
	return function catchError(err) {
		res.status(statusCode).json(err);
	};
};

