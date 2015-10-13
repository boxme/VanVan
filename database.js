"use strict";

var moment = require('moment');
var async = require('async');
var _ = require('lodash');
var promise = require('bluebird');
var model = require('./models/index.js');
var schema = require('./data/schema.js');

var initDb = function() {
	return model
			.bookshelf
			.knex
			.schema
			.createTable(tableName, function modifyTable(table) {

				var column;
				var columnKeys = _.keys(schema[tableName]);

				columnKeys.forEach(function processKey(key) {
					
				});
			});
};

exports.initialisation = initDb;