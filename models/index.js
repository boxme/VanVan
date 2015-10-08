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

var bookShelf = require('bookshelf')(knex);
bookShelf.plugin('visibility');

