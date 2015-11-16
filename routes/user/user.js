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
	if (userObject.hasOwnProperty('password')) {
		delete(userObject.password);
	}
	return userObject;
};

userController.login = function (req, res) {
	var userEmail = req.body.email;
	var userPassword = req.body.password;

	if (!userPassword || !userEmail) {
		res.status(400).json({error: "include your email and password"});
		return;
	}

	collections.userCollection
					.forge()
					.query(function query(qb) {
						qb.where('email', '=', req.body.email.toLowerCase());
					})
					.fetchOne()
					.then(function getUser(user) {
						if (user) {
							var isPassword = bcrypt.compareSync(userPassword, user.get('password'));

							if (isPassword) {
								return generateToken(user);
							} 
							return promise.reject('password_incorrect');
						}
						return promise.reject('user_not_found');
					})
					.then(function getUserWithToken(user) {
						// TODO: Remove password from user before returning
						res.status(200).json(user);
					})
					.catch(errorCallback(res, 404));

};

var generateToken = function (user) {
	if (user.get('token')) {
		console.log('user has token');
		return promise.resolve(user);
	}
	var randomBytes = promise.promisify(crypto.randomBytes);
	return randomBytes(48)
					.then(function buf(buf) {
						var newToken = buf.toString('hex');
						return user.save({token: newToken});
					});
};

userController.logout = function (req, res) {
	var token = req.body.token;

	if (!token) {
		res.status(400).json({error: "Require user token"});
		return;
	}

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
							return;
						}
						res.status(404).json({error: "user not found"});
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
						name: req.body.name,
						email: req.body.email.toLowerCase(),
						mobile: req.body.mobile,
						password: hash
					})
					.then(function getResult(result) {
						if (result) {
							userController.login(req, res);
						}
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
						if (user) {
							user = removePasswordFromData(user);
							res.status(200).json(user);
							return;
						}
						res.status(404).json({});
					})
					.catch(errorCallback(res, 500));
};

userController.updateUser = function (req, res) {
	var userPassword = req.body.password;
	if (userPassword) {
		var salt = bcrypt.genSaltSync(12);
		userPassword = bcrypt.hashSync(req.body.password, salt);
	}

	collections.userCollection
					.forge()
					.query(function getUserId(qb) {
						qb.where('id', '=', req.params.id);
					})
					.fetchOne({
						require: true
					})
					.then(function getResult(user) {
						if (user) {
							user.save({
									name: req.body.name || user.get('name'),
									email: req.body.email || user.get('email'),
									mobile: req.body.mobile || user.get('mobile'),
									password: userPassword || user.get('password')
								})
								.then(function userUpdated(result) {
									result = removePasswordFromData(result);
									res.status(200).json(result);
								})
								.catch(errorCallback(res, 500));
							return;
						}
						res.status(404).json({});
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
						if (user) {
							user.destroy()
								.then(function userDeleted() {
									res.status(200).json({});
								})
								.catch(errorCallback(res, 500));
						}
						res.status(404).json({});
						if (!user) {
							
						}
					})
					.catch(errorCallback(res, 500));
};

module.exports = userController;

























