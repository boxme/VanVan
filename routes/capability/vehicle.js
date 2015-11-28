'use strict';

var root = '../';
var vehController = {};
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var collections = require(root + root + 'models/capability/collection.js');
var errorHelper = require(root + root + 'helper/errorHandler.js').errorCallback;

vehController.getAll = function (req, res) {
	collections.vehCollection
				.forge()
				.fetch()
				.then(function getAllVehicles(result) {
					res.status(200).json(result);
				})
				.catch(errorHelper(res, 500));
};

module.exports = vehController;