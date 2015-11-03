'use strict';

var root = '../';
var userController = {};
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var promise = require('bluebird');
var collections = require(root + root + 'models/user/collection.js');

var errorCallback = function (res, statusCode) {
	return function catchError(err) {
		res.status(statusCode).json(err);
	};
};

var removePasswordFromData = function (user) {
	var userObject = user.toJSON();
	if (user.hasOwnProperty('password')) {
		delete(userObject.password);
	}

	return userObject;
};

userController.login = function (req, res) {
	var userEmail = req.body.email;
	var userPassword = req.body.password;

	if (!userEmail && !userPassword) {
		res.status(400).json(error: "include your email and password");
	}


	collections.userController
					.forge()
					.query(function query(qb) {
						qb.where('email', '=', req.body.email.toLowerCase());
					})
					.fetchOne()
					.then(function getUser(user) {
						if (user) {
							var isPassword = bcrypt.compareSync(userPassword);

							if (isPassword) {
								generateToken(user);
							} else {
								return promise.reject('password_incorrect');
							}
						} else {
							return promise.reject('user_not_found');
						}
					})
					.then(function getUserWithToken(user) {
						// TODO: Remove password from user before returning
						res.status(200).json(user);
					})
					.catch(errorCallback(res, 404));

};

var generateToken = function (user) {
	if (user.get('token')) {
		return promise.resolve(user);
	} else {
		var randomBytes = promise.promisify(crypto.randomBytes);

		return randomBytes(48)
						.then(function buf(buf) {
							var newToken = buf.toString('hex');
							return user.save({token: newToken})
						});
	}
};

userController.logout = function (req, res) {
	collections.userCollection
					.forge()
					.query(function query(qb) {
						qb.where('token', '=', req.body.token);
					})
					.fetchOne()
					.then(function getUser(user) {
						if (user) {
							user.save({token: null});
							res.status(200).json({message: "logout"});
						} else {
							res.status(404).json(error: "user not found");
						}
					})
					.catch(errorCallback(res, 500));
};

userController.getAll = function (req, res) {
	collections.userCollection
					.forge()
					.fetch()
					.then(function getResult(result) {
						result = result.map(removePasswordFromData);
						res.status(200).json(result);
					})
					.catch(errorCallback(res, 500));
};

userController.createUser = function (req, res) {
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

userController.getUser = function (req, res) {
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

userController.updateUser = function (req, res) {
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

userController.destroyUser = function (req, res) {
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

























