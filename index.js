"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const config = require(__dirname + '/config');
const auth = require(__dirname + '/routes/auth');
const room = require(__dirname + '/routes/room');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


let clientsConnected = 0;

let playlist = [
  {
    id: 1,
    title: 'Song n 2',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  },
  {
    id: 2,
    title: 'Song n 2',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  },
  {
    id: 3,
    title: 'Go crasdazy',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  },
  {
    id: 4,
    title: 'Go crasdazy',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  },
  {
    id: 5,
    title: 'Go crasdazy',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  },
  {
    id: 6,
    title: 'Go crasdazy',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  },
  {
    id: 7,
    title: 'Go crasdazy',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  },
  {
    id: 8,
    title: 'Go crasdazy',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  },
  {
    id: 9,
    title: 'Go crasdazy',
    artist: 'Roberto',
    album: 'Black Album',
    votes: 4
  }
];

// search in spotify https://api.spotify.com/v1/search?q=Naistumichiu&type=track
// play items https://api.spotify.com/v1/me/player/play -->> {"uris":["spotify:track:6QsBAmr6MYenvug840GTWD"]}


io.on('connection', function (client) {
  clientsConnected = clientsConnected + 1;
  console.log("Clientes conectados: ", clientsConnected);

  client.on("join", function (roomId) {
    console.log('New client in ' + roomId);
    client.join("room-" + roomId);
    io.sockets.in("room-" + roomId).emit('playlist', playlist);
    console.log(client);
  });

  client.on("remove", function (trackId) {
    _.remove(playlist, {
      id: trackId
    });
    io.emit("removed", trackId);
  });

  client.on("add", function (text) {
    console.log(text);
  });

  client.on('disconnect', function () {
    clientsConnected = clientsConnected - 1;
    console.log("Clientes conectados: ", clientsConnected);
  });
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

///Setting port
app.set('port', config.port);

//Backend routes
app.use('/api/auth', auth);

app.use('/api/room', room);


//Frontend routes
app.use('/', express.static(__dirname + '/front/dist'));

app.use((req, res) => {
    res.sendFile(__dirname + '/front/dist/index.html');
});

//Start Server
server.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
});