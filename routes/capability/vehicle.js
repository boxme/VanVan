'use strict';

var root = '../';
var vehController = {};
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var collections = require(root + root + 'models/capability/collection.js');
var errorHelper = require(root + root + 'helper/errorHandler.js').errorCallback;

vehController.getAll = function (req, res) {
	collections.vehCollection
				.forge()
				.fetch()
				.then(function getAllVehicles(result) {
					res.status(200).json(result);
				})
				.catch(errorHelper(res, 500));
};

vehController.getVehicle = function (req, res) {
	var driverId = req.params.driver_id;
	var vehId = req.params.veh_id;
	if (!driverId || !vehId) {
		res.status(400).json({error: "Require driver or vehicle Id"});
		return;
	}

	collections.vehCollection
				.forge()
				.query(function query(qb) {
					qb.where('id', '=', vehId).andWhere('driver_id', '=', driverId);
				})
				.fetchOne()
				.then(function result(vehicle) {
					if (vehicle) {
						res.status(200).json(vehicle);
						return;
					}
					res.status(404).json(error: "Vehicle not found");
				})
				.catch(errorHelper(res, 500));
};

vehController.addVehicle = function (req, res) {
	var driverId = req.body.driver_id;
	if (!vehId) {
		res.status(400).json({error: "Require driver Id"});
		return;
	}

	var vehMake = req.body.vehicle_make;
	var vehModel = req.body.vehicle_model;
	var vehVol = req.body.vehicle_volume;

	if (!vehMake || !vehModel || !vehVol) {
		res.status(400).json({error: "Require vehicle info"});
		return;
	}

	collections.vehCollection
				.forge()
				.create({
					driver_id: driverId,
					veh_make: vehMake,
					veh_model: vehModel,
					veh_vol: vehVol
				})
				.then(function createdVeh(vehicle) {
					res.status(200).json(vehicle);
				})
				.catch(errorHelper(res, 500));
}

module.exports = vehController;








