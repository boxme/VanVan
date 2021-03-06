'use strict';

var moment = require('moment');
var async = require('async');
var _ = require('lodash');
var promise = require('bluebird');

var createTable = function(tableName, model, schema) {
	return model
			.bookshelf
			.knex
			.schema
			.createTable(tableName, function modifyTable(table) {

				var column;
				var columnKeys = _.keys(schema[tableName]);

				columnKeys.forEach(function processKey(key) {

					if (schema[tableName][key].type === 'text' && schema[tableName][key].hasOwnProperty('fieldtype')) {
						column = table[schema[tableName][key].type](key, schema[tableName][key].fieldtype);
					} else if (schema[tableName][key].type === 'string' && schema[tableName][key].hasOwnProperty('maxlength')) {
						column = table[schema[tableName][key].type](key, schema[tableName][key].maxlength);
					} else {
						column = table[schema[tableName][key].type](key);
					}

					if (schema[tableName][key].hasOwnProperty('nullable') && schema[tableName][key].nullable === true) {
						column.nullable();
					} else {
						column.notNullable();
					}

					if (schema[tableName][key].hasOwnProperty('primary') && schema[tableName][key].primary === true) {
						column.primary();
					}

					if (schema[tableName][key].hasOwnProperty('unique') && schema[tableName][key].unique === true) {
						column.unique();
					}

					if (schema[tableName][key].hasOwnProperty('unsigned') && schema[tableName][key].unsigned === true) {
						column.unsigned();
					}

					if (schema[tableName][key].hasOwnProperty('references')) {
						column.references(schema[tableName][key].references);
					}

					if (schema[tableName][key].hasOwnProperty('defaultTo')) {
						column.defaultTo(schema[tableName][key].defaultTo);
					}

				});
			});
};

var doesTableExist = function(tableName, model) {
	return model.bookshelf.knex.schema.hasTable(tableName);
};

var setupTable = function(tableName, model, schema) {
	return function Callback(callback) {
		doesTableExist(tableName, model)
			.then(function tableExists(exists) {

				if (!exists) {
					
					console.log('Creating database table ' + tableName + '...');

					createTable(tableName, model, schema)
						.then(function tableCreated(result) {
							console.log("---> Created database table " + tableName);
							callback(null, result);
						})
						.catch(setupTableError(tableName, callback));

				} else {
					callback(null, exists);
				}

			})
			.catch(setupTableError(tableName, callback));
	};
};

var setupTableError = function(tableName, callback) {
	return function(error) {
		console.log('Error creating ' + tableName + " table " + error);
		callback(error, null);
	};
};

var initDb = function(schema, model) {
	var calls = [];
	var tableNames = _.keys(schema);

	tableNames.forEach(function createTable(tableName) {
		calls.push(setupTable(tableName, model, schema))
	});

	async.series(calls, function callback(err, result) {
		if (!err) {
			console.log('Finished initialisating database table');
		} else {
			console.log('Error initialisating database table: ' + err);
		}
	});
};

exports.initialisation = initDb;