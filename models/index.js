'use strict';

var moment = require('moment');

var knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: '',
		password: '',
		database: 'GrabVan'
	}
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('visibility');

var user = bookshelf.Model.extend({
	tableName: 'user'
});
exports.user = user;

var driver = bookshelf.Model.extend({
	tableName: 'driver'
});
exports.driver = driver;

var vehicle = bookshelf.Model.extend({
	tableName: 'vehicle',
	owner: function () {
		// one-to-one
		return this.belongsTo(driver, 'driver_id');
	}
});
exports.vehicle = vehicle;

var availability = bookshelf.Model.extend({
	tableName: 'availability',
	driver: function () {
		// one-to-many
		return this.belongsTo(driver, 'driver_id');
	}
});
exports.availability = availability;

exports.bookshelf = bookshelf;