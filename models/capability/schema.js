'use strict';

const driverSchema = {
	driver: {
		id: {type: 'increments', nullable: false, primary: true},
		name: {type: 'string', maxlength: 150, nullable: false},
		email: {type: 'string', maxlength: 254, nullable: true, unique: false},
		license: {type: 'string', maxlength 254, nullable: false, unique: true},
		password: {type: 'string', nullable: false},
		mobile: {type: 'string', nullable: false, unique: true},
		loc_lat: {type: 'float', nullable: true},
		loc_lng: {type: 'float', nullable: true},
		token: {type: 'string', nullable: true}
	},

	vehicle: {
		id : {type: 'increments', nullable: false, primary: true},
		driver_id: {type: 'integer', nullable: false, unique: false},
		veh_make: {type: 'string', nullable: false},
		veh_model: {type: 'string', nullable: false},
		veh_vol: {type: 'float', nullable: false}
	},

	availability: {
		id: {type: 'increments', nullable: false, primary: true},
		driver_id: {type: 'integer', nullable: false, unique: false},
		area: {type: 'string', nullable: false},
		time: {type: 'string', nullable: false}
	}
};

exports.driverSchema = driverSchema;