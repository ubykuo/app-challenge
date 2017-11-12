"use strict";
const express = require('express');
const socketSync = require(__dirname + '/socketSync');
const mongoose = require(__dirname + '/dbConnection');
const config = require(__dirname + '/config');
const fs = require('fs');

const app = express();
let server;

if (process.env.PRODUCTION) {
  server = require('https').createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/music-room.ubykuo.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/music-room.ubykuo.com/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/music-room.ubykuo.com/chain.pem')
  }, app);
} else {
  server = require('http').createServer(app);
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
if (process.env.PRODUCTION) {
  const redirectApp = express();
  const redirectRouter = express.Router();
  redirectApp.use('*', redirectRouter);

  redirectRouter.get('*', (req, res) => {
    return res.redirect('https://' + req.headers.host + req.url);
  });

  const redirectServer = require('http').createServer(redirectApp);
  redirectServer.listen(80);
}

server.listen(config.port, '0.0.0.0', function () {
  console.log('App Challenge listening on port', config.port);
});
