'use strict';

var authController = require('../authenticator/auth.js');
var userController = require('./user/user.js');

var processApi = function processApi(app) {
	// User
	app.get('/users', authController.requireToken(), userController.getAll);
	app.get('/users/:id', authController.requireToken(), userController.getUser);
	app.post('users', userController.createUser);
	app.post('/users/login', userController.login);
	app.post('/users/logout', authController.requireToken(), userController.logout);
	app.put('users/:id', authController.requireToken(), userController.updateUser);
	app.delete('users/:id', authController.requireToken(), userController.destroyUser);
};

module.exports = processApi;