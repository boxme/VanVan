"use strict";

var schema = {
	user: {
		id: {type: 'increments', nullable: false, primary: true},
		name: {type: 'string', maxlength: 150, nullable: false},
		email: {type: 'string', maxlength: 254, nullable: false, unique: true},
		password: {type: 'string', nullable: false},
		mobile: {type: 'string', nullable: false, unique: true},
		token: {type: 'string', nullable: true}
	},

	driver: {
		id: {type: 'increments', nullable: false, primary: true},
		name: {type: 'string', maxlength: 150, nullable: false},
		email: {type: 'string', maxlength: 254, nullable: false, unique: true},
		password: {type: 'string', nullable: false},
		mobile: {type: 'string', nullable: false, unique: true},
		companyId: {type: 'integer', nullable: true, unique: false},
		token: {type: 'string', nullable: true}
	}
};

module.exports = schema;