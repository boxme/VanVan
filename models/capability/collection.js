'use strict';

const model = require('../index.js');

const driver = model.bookshelf
				   .Collection
				   .extend({
				   		model: model.driver
				   });

exports.driverCollection = driver;

const vehicle = model.bookshelf
				  	.Collection
				  	.extend({
				  		model: model.vehicle
				  	});

exports.vehCollection = vehicle;

const availability = model.bookshelf
						.Collection
						.extend({
							model: model.availability
						});

exports.availabilityCollection = availability;