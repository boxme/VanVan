'use strict';

var root = '../';
var driverController = {};
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var collections = require(root + root + 'models/capability/collection.js');

// Data is in json
driverController.getDriver = function (data) {
	console.log('Get driver');
	var id = data.driverId;

};

driverController.acceptJob = function (data) {
	console.log('Accepted job');
};

driverController.rejectJob = function (data) {
	console.log('Rejected job');
};

driverController.sendDriverJob = function (data) {
	
};

driverController.disconnect = function () {
	console.log('Driver disconnected');
};

module.exports = driverController;