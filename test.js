const ioClient = require('socket.io-client');

let socket = new ioClient("http://localhost:8080");

socket.on('connect', function(){
  console.log("Me conecte al servidor");
});

socket.on('disconnect', function(){
  console.log("servidor desconectado :(, quiero escuchar musica");
});