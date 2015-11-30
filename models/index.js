'use strict';

const moment = require('moment');

const knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: '',
		password: '',
		database: 'GrabVan'
	}
});

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('visibility');

const user = bookshelf.Model.extend({
	tableName: 'user'
});
exports.user = user;

const driver = bookshelf.Model.extend({
	tableName: 'driver'
});
exports.driver = driver;

const vehicle = bookshelf.Model.extend({
	tableName: 'vehicle',
	owner: function () {
		// one-to-one
		return this.belongsTo(driver, 'driver_id');
	}
});
exports.vehicle = vehicle;

const availability = bookshelf.Model.extend({
	tableName: 'availability',
	driver: function () {
		// one-to-many
		return this.belongsTo(driver, 'driver_id');
	}
});
exports.availability = availability;

exports.bookshelf = bookshelf;