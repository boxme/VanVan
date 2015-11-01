'use strict';

var userSchema = {
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
		email: {type: 'string', maxlength: 254, nullable: true, unique: false},
		password: {type: 'string', nullable: false},
		mobile: {type: 'string', nullable: false, unique: true},
		company_id: {type: 'integer', nullable: true, unique: false},
		token: {type: 'string', nullable: true}
	},

	company: {
		id: {type: 'increments', nullable: false, primary: true},
		name: {type: 'string', maxlength: 150, nullable: false, unique: true},
		email: {type: 'string', maxlength: 254, nullable: false, unique: true},
		address: {type: 'string', maxlength: 254, nullable: false},
		mobile: {type: 'string', nullable: false, unique: true}
	}
};

exports.userSchema = userSchema;