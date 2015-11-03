'use strict';

var model = require('../index.js');

var users = model
				.bookshelf
				.Collection
				.extend({
					model : model.user
				});
				
exports.userCollection = users;

var drivers = model
				.bookshelf
				.Collection
				.extend({
					model : model.driver
				});

exports.driverCollection = drivers;

var company = model
				.bookshelf
				.Collection
				.extend({
					model : mode.company
				});

exports.companyCollection = company;