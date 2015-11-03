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
	tableName: 'driver',
	company: function() {
		// one-to-one or many-to-one
		return this.belongsTo(company, 'company_id');
	}
});
exports.driver = driver;

var company = bookshelf.Model.extend({
	tableName: 'company',
	driver: function() {
		// one-to-many
		this.hasMany(driver, "driver_id");
	}
});
exports.company = company;

exports.bookshelf = bookshelf;