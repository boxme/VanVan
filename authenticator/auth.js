'use strict';

var authController = {};
var collections = require('../models/user/collection.js');

// token type
var tokenType = {
	NONE: 'NONE_TOKEN',
	BODY: 'BODY_TOKEN',
	QUERY: 'QUERY_TOKEN',
	HEADER: 'HEADER_TOKEN'
};

authController.requireToken = function requireToken() {
	return function checkForToken(req, res, next) {
		
		var tokenMethod = tokenType.NONE;
		var token;

		if (req.body.token) {
			token = req.body.token;
			tokenMethod = tokenType.BODY;
		} else if (req.query.token) {
			token = req.query.token;
			tokenMethod = tokenType.QUERY;
		} else if (req.headers.token) {
			token = req.headers.token;
			tokenMethod = tokenType.HEADER;
		}

		console.log('Auth method: ' + tokenMethod + ' - ' + req.url);

		if (token) {
			collections.userCollection
						.forge()
						.query(function query(qb) {
							qb.where('token', '=', token);
						})
						.fetchOne()
						.then(function result(user) {
							if (user) {
								// Keep the user in req.user = user if you require
								next();
							} else {
								errorHandling(res, 404, "user_not_found");
							}
						})
						.catch(function error(err) {
							errorHandling(res, 500, err.message);
						});

		} else {
			errorHandling(res, 401, "require_token");
		}
	};
};

var errorHandling = function errorHandling(res, statusCode, message) {
	res.status(statusCode).json({error: message});
};

module.exports = authController;