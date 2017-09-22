"use strict";
const ioClient = require('socket.io-client');

let socket = new ioClient("http://localhost:8080");

const ROOM_ID = 11138721142;

let song = {
    title: "Help",
    votes: [],
    spotify_id: "6JN0k3R65B7T47lsHwgBjQ",
    spotify_uri: "spotify:track:0FrCX7P2C2hcRTcuhjEvK4",
    artist: "lal"
};

socket.on('connect', function(){
  console.log("Me conecte al servidor");

  socket.emit('join', ROOM_ID);

  socket.emit('addSong', ROOM_ID ,song);


});

let addSong = true;

socket.on('playlist',(playlist)=>{
  console.log("Recibi un playlist");
  if(addSong) {
      socket.emit('addSongToPlaylist', ROOM_ID);
      addSong = false;
  }
});



socket.on('disconnect', function(){
  console.log("servidor desconectado :(, quiero escuchar musica");
});