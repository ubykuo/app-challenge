"use strict";
const socketSync = require(__dirname + '/socketSync');
const server = require('http').createServer();
const mongoose = require(__dirname + '/dbConnection');
const config = require(__dirname + '/config.js');

const io = require('socket.io')(server);

//Init socket
socketSync.init(io);

//Start Server
server.listen(config.port);