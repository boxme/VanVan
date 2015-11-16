'use strict';

var companyController = {};
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var promise = require('bluebird');
// var collection = require('../../models/user/collection.js');

// var errorCallback = function (res, statusCode) {
// 	return function catchError(err) {
// 		res.status(statusCode).json(err);
// 	};
// };

// var removePasswordFromData = function (company) {
// 	var companyObject = company.toJSON(); 
// 	if (company.hasOwnProperty('password')) {
// 		delete(companyObject.password);
// 	}

// 	return companyObject;
// };

// companyController.create = function (req, res) {
// 	var salt = bcrypt.genSaltSync(12);
// 	var hash = bcrypt.hashSync(req.body.password, salt);

// 	collection.companyCollection
// 						.forge()
// 						.create({
// 							name : req.body.company_name,
// 							email : req.body.company_email,
// 							password : req.body.password,
// 							address : req.body.company_address,
// 							mobile : req.body.company_mobile 
// 						})
// 						.then(function created(company) {
// 							// TODO: login company after creating
// 							res.status(200).json(company);
// 						})
// 						.catch(errorCallback(res, 500));
// };

// companyController.getAll = function (req, res) {
// 	collection.companyCollection
// 						.fetch()
// 						.then(function getAll(company) {
// 							company = company.map(removePasswordFromData(company));
// 							res.status(200).json(company);
// 						})
// 						.catch(errorCallback(res, 500));
// };

// companyController.getCompany = function (req, res) {
// 	collection.companyCollection
// 						.forge()
// 						.query(function query(qb) {
// 							qb.where('id', '=', req.params.id);
// 						})
// 						.fetchOne()
// 						.then(function result(company) {
// 							if (company) {
// 								company = removePasswordFromData(company);
// 								res.code(200).json(company);
// 							} else {
// 								res.code(404).json({error: "company is not found"});
// 							}
// 						})
// 						.catch(errorCallback(res, 500));
// };

// companyController.login = function (req, res) {
// 	var companyEmail = req.body.email;
// 	var companyPassword = req.body.password;

// 	if (!companyEmail || !companyPassword) {
// 		ress.status(400).json({error: "Include your email and password"});
// 	}

// 	collection.companyCollection
// 						.forge(function query(qb) {
// 							qb.where('email', '=', companyEmail);
// 						})
// 						.query()
// 						.fetchOne()
// 						.then(function result(company) {
// 							if (company) {
// 								var isPassword = bcrypt.compareSync(companyPassword, company.get('password'));

// 								if (isPassword) {
// 									generateToken(company);
// 								} else {
// 									return promise.reject('password_incorrect');
// 								}
// 							} else {
// 								return promise.reject('company_not_found');
// 							}
// 						})
// 						.then(function getCompany(company) {
// 							res.status(200).json(company);
// 						})
// 						.catch(errorCallback(res, 404));
// };

// var generateToken = function (company) {
// 	if (company.get('token')) {
// 		return promise.resolve(company);
// 	} else {
// 		var randomBytes = promise.promisify(crypto.randomBytes);

// 		return randomBytes(48)
// 						.then(function buf(buf) {
// 							var newToken = buf.toString('hex');
// 							return company.save({token: newToken});
// 						});
// 	}
// };

// companyController.logout = function (req, res) {
// 	collection.companyCollection
// 						.forge()
// 						.query(function query(qb) {
// 							qb.where('token', '=', req.body.token);
// 						})
// 						.fetchOne()
// 						.then(function getCompany(company) {
// 							company.save({token: null});
// 							req.status(200).json({message: "logout"});
// 						})
// 						.catch(errorCallback(res, 404));
// };

// companyController.destroyCompany = function (req, res) {
// 	collection.companyController
// 						.forge()
// 						.query(function query(qb) {
// 							qb.where('id', '=', req.params.id);
// 						})
// 						.fetchOne()
// 						.then(function getCompany(company) {
// 							return company.destroy();
// 						})
// 						.then(function companyDeleted() {
// 							res.status(200).json({message: "company deleted"});
// 						})
// 						.catch(errorCallback(res, 404));
// }

module.exports = companyController;














