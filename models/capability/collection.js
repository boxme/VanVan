'use strict';

var model = require('../index.js');

var driver = model.bookshelf
				   .Collection
				   .extend({
				   		model: model.driver
				   });

exports.driverCollection = driver;

var vehicle = model.bookshelf
				  	.Collection
				  	.extend({
				  		model: model.vehicle
				  	});

exports.vehicleCollection = vehicle;

var availability = model.bookshelf
						.Collection
						.extend({
							model: model.availability
						});

exports.availabilityCollection = availability;