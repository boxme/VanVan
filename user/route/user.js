'use strict';

var root = '../';
var userController = {};
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var collections = require(root + 'data/collection.js');

userController.getAll = function(req, res) {
	collections.userCollection
					.forge()
					.fetch()
					.then(function(result) {
						res.status(200).json(result);
					})
					.catch(function(err) {
						res.status(500).json(err);
					});
};

userController.create = function(req, res) {
	var salt = bcrypt.genSaltSync(12);
	var hash = bcrypt.hashSync(req.body.password, salt);

	collections.userCollection
					.forge()
					.create( {
						// TODO:
					})
					.then(function(result) {
						res.status(200).json(result);
					})
					.catch(function(err) {
						res.status(500).json(err);
					});
};

module.exports = userController;