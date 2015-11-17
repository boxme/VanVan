'use strict';

var model = require('../index.js');

var user = model
				.bookshelf
				.Collection
				.extend({
					model: model.user
				});
				
exports.userCollection = user;