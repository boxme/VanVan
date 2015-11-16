'use strict';

var model = require('../index.js');

var users = model
				.bookshelf
				.Collection
				.extend({
					model : model.user
				});
				
exports.userCollection = users;