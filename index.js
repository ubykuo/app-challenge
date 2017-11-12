"use strict";
const express = require('express');
const socketSync = require(__dirname + '/socketSync');
const mongoose = require(__dirname + '/dbConnection');
const config = require(__dirname + '/config');

const app = express();

if (process.env.PRODUCTION) {
  const fs = require('fs');
  const server = require('https').createServer(app, {
    key: fs.readFileSync('/etc/letsencrypt/live/music-room.ubykuo.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/music-room.ubykuo.com/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/music-room.ubykuo.com/chain.pem')
  });
} else {
  const server = require('http').createServer(app);
}

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
server.listen(config.port, '0.0.0.0', function () {
  console.log('App Challenge listening on port', config.port);
});
