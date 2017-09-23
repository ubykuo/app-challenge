"use strict";
const ioClient = require('socket.io-client');

let socket = new ioClient("http://localhost:3000");

const ROOM_ID = 11138721142;

let song = {
  title: "Help",
  votes: [],
  spotify_id: "6JN0k3R65B7T47lsHwgBjQ",
  spotify_uri: "spotify:track:0FrCX7P2C2hcRTcuhjEvK4",
  artist: "lal"
};

socket.on('connect', function () {
  console.log('connect');
});

socket.emit('access-room', 123456789);

/*socket.emit('add-song', 1, 123456789, {
  id: "213kl123klj"
});*/

/*socket.emit('vote', 123, 123456789, {
  id: "213kl123klj"
});*/

/*socket.emit('remove', 123456789, {
  id: "213kl123klj"
});*/

socket.emit('next', 123456789);

socket.on('room', (room) => {
  console.log(room);
});

socket.on('disconnect', function () {
  console.log('disconnect');
});