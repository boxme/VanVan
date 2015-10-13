"use strict";

var schema = {
	users: {
		id: {type: 'increments', nullable: false, primary: true},
		name: {type: 'string', maxlength: 150, nullable: false},
		email: {type: 'string', maxlength: 254, nullable: false, unique: true},
		password: {type: 'string', nullable: false},
		mobile: {type: 'string', nullable: false, unique: true},
		token: {type: 'string', nullable: true}
	}
};

module.exports = schema;