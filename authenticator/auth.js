'use strict';

var authController = {};

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
			// TODO: Check for validity of token and then next() if it's correct
		} else {
			res.status(400).json({error: "require_token"});
		}
	};
};

module.exports = authController;