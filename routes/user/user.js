'use strict';

var root = '../';
var userController = {};
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var collections = require(root + root + 'models/user/collection.js');

var errorCallback = function errorCallback(res, statusCode) {
	return function catchError(err) {
		res.status(statusCode).json(err);
	};
};

var removePasswordFromData = function removePasswordFromData(user) {
	var userObject = user.toJSON();
	if (user.hasOwnProperty('password')) {
		delete(userObject.password);
	}

	return userObject;
};

userController.getAll = function getAll(req, res) {
	collections.userCollection
					.forge()
					.fetch()
					.then(function getResult(result) {
						result = result.map(removePasswordFromData);
						res.status(200).json(result);
					})
					.catch(errorCallback(res, 500));
};

userController.createUser = function createUser(req, res) {
	var salt = bcrypt.genSaltSync(12);
	var hash = bcrypt.hashSync(req.body.password, salt);

	collections.userCollection
					.forge()
					.create( {
						// TODO: hash password
						name: req.body.name,
						email: req.body.email.toLowerCase(),
						mobile: req.body.mobile,
						password: hash
					})
					.then(function getResult(result) {
						res.status(200).json(result);
					})
					.catch(errorCallback(res, 500));
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
							user = removePasswordFromData(user);
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
					.then(function getResult(user) {
						if (!user) {
							res.status(404).json({});
						} else {
							user.save({
									// TODO: hash password
									name: req.body.name || user.get('name'),
									email: req.body.email || user.get('email'),
									mobile: req.body.mobile || user.get('mobile'),
									password: req.body.password || user.get('password')
								})
								.then(function userUpdated(result) {
									result = removePasswordFromData(result);
									res.status(200).json(result);
								})
								.catch(errorCallback(res, 500));
						}
					})
					.catch(errorCallback(res, 500));
};

userController.destroyUser = function destroyUser(req, res) {
	collections.userCollection
					.forge()
					.query(function getUserId(qb) {
						qb.where('id', '=', req.params.id);
					})
					.fetchOne({
						require: true
					})
					.then(function getResult(user) {
						if (!user) {
							res.status(404).json({});
						} else {
							user.destroy()
								.then(function userDeleted() {
									res.status(200).json({});
								})
								.catch(errorCallback(res, 500));
						}
					})
					.catch(errorCallback(res, 500));
};

module.exports = userController;

























