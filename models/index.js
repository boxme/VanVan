"use strict";

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

exports.bookshelf = bookshelf;