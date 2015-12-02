'use strict';

var socketio = require('socket.io');

var listen = function (server) {
	var io = socketio.listen(server);
	return io;
};

module.exports = listen;