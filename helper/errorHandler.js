'user strict';

var errorCallback = function (res, statusCode) {
	return function catchError(err) {
		res.status(statusCode).json(err);
	};
};

module.errorCallback = errorCallback;