"use strict";
const express = require('express');
const socketSync = require(__dirname + '/socketSync');
const mongoose = require(__dirname + '/dbConnection');
const config = require(__dirname + '/config');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Init socket
socketSync.init(io);

//Frontend routes
app.use('/', express.static(__dirname + '/front/dist'));

//Index fallback
app.use((req, res) => {
  res.sendFile(__dirname + '/front/dist/index.html');
});

//Start Server
server.listen(config.port, '127.0.0.1', function () {
  console.log('App Challenge listening on port', config.port);
});
