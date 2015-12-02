'use strict';

const authController = require('../authenticator/auth.js');
const userController = require('./user/user.js');
const driverController = require('./capability/driver.js');

const processApi = function processApi(app, socketIO) {
	// User
	app.get('/users', authController.requireToken(), userController.getAll);
	app.get('/users/:id', authController.requireToken(), userController.getUser);
	app.post('/users', userController.createUser);
	app.post('/users/login', userController.login);
	app.post('/users/logout', authController.requireToken(), userController.logout);
	app.put('/users/:id', authController.requireToken(), userController.updateUser);
	app.delete('/users/:id', authController.requireToken(), userController.destroyUser);

	// Driver
	socketIO.on('connection', function connected(socket) {
		socket.on('getDriver', driverController.getDriver);
		socket.on('disconnect', driverController.disconnect);
	});
};

module.exports = processApi;