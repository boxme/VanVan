'use strict';

var companyController = {};
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var promise = require('bluebird');
var collection = require('../../models/user/collection.js');

var errorCallback = function (res, statusCode) {
	return function catchError(err) {
		res.status(statusCode).json(err);
	};
};

var removePasswordFromData = function (company) {
	var companyObject = company.toJSON(); 
	if (company.hasOwnProperty('password')) {
		delete(companyObject.password);
	}

	return companyObject;
};

companyController.create = function (req, res) {
	var salt = bcrypt.genSaltSync(12);
	var hash = bcrypt.hashSync(req.body.password, salt);

	collection.companyCollection
						.forge()
						.create({
							name : req.body.company_name,
							email : req.body.company_email,
							password : req.body.password,
							address : req.body.company_address,
							mobile : req.body.company_mobile 
						})
						.then(function created(company) {
							res.status(200).json(company);
						})
						.catch(errorCallback(res, 500));
};

companyController.getAll = function (req, res) {
	collection.companyCollection
						.fetch()
						.then(function getAll(company) {
							company = company.map(removePasswordFromData(company));
							res.status(200).json(company);
						})
						.catch(errorCallback(res, 500));
};

companyController.getCompany = function (req, res) {
	collection.comapnyCollection
						.forge()
						.query(function query(qb) {
							qb.where('id', '=', req.params.id);
						})
						.fetchOne()
						.then(function result(company) {
							if (company) {
								company = removePasswordFromData(company);
								res.code(200).json(company);
							} else {
								res.code(404).json({});
							}
						})
						.catch(errorCallback(res, 500));
};

module.exports = companyController;