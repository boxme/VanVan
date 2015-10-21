'use strict';

var root = '../';
var userController = {};
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var collections = require(root + 'data/collection.js');

var errorCallback = function errorCallback(res, statusCode) {
	return function catchError(err) {
		res.status(statusCode).json(err);
	};
};

userController.getAll = function getAll(req, res) {
	collections.userCollection
					.forge()
					.fetch()
					.then(function getResult(result) {
						res.status(200).json(result);
					})
					.catch(errorCallback(res, 500));
};

userController.create = function create(req, res) {
	var salt = bcrypt.genSaltSync(12);
	var hash = bcrypt.hashSync(req.body.password, salt);

	collections.userCollection
					.forge()
					.create( {
						// TODO:
					})
					.then(function getResult(result) {
						res.status(200).json(result);
					})
					.catch(errorCallback(res, 500) );
};

userController.getUser = function getUser(req, res) {
	collections.userCollection
					.forge()
					.query(function getUserId(qb) {
						qb.where('id', '=', req.params.id);
					})
					.fetchOne()
					.then(function getResult(user) {
						if (!user) {
							res.status(404).json({});
						} else {
							// TODO:
							res.status(200).json(user);
						}
					})
					.catch(errorCallback(res, 500));
};

userController.updateUser = function updateUser(req, res) {
	collections.userCollection
					.forge()
					.query(function getUserId(qb) {
						qb.where('id', '=', req.params.id);
					})
					.fetchOne({
						require: true
					})
					.then(fucntion getResult(user) {
						if (!user) {
							res.status(404).json({});
						} else {
							user.save({
								name: req.body.name || user.get('name')
								email: req.body.email || user.get('email')
							})
								.then(function userUpdated(result) {
									// TODO
									res.status(200).json(result);
								})
								.catch(errorCallback(res, 500));
						}
					})
					.catch(errorCallback(res, 500));
};

module.exports = userController;

























