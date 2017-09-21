const _ = require('lodash');

let clientsConnected = 0;

let playlist = [
    {
        id: 1,
        title: 'Song n 2',
        artist: 'Roberto',
        album: 'Black Album',
        votes: [{user: 'iqNk8OspZw'}, {user: 'pepe'}, {user: 'carlitos'}]
    },
    {
        id: 2,
        title: 'Song n 2',
        artist: 'Roberto',
        album: 'Black Album',
        votes: [{user: 'pepe'}, {user: 'carlitos'}, {user: 'juan'}]
    },
    {
        id: 3,
        title: 'Go crasdazy',
        artist: 'Roberto',
        album: 'Black Album',
        votes: [{user: 'pepe'}, {user: 'carlitos'}, {user: 'juan'}]

    },
    {
        id: 4,
        title: 'Go crasdazy',
        artist: 'Roberto',
        album: 'Black Album',
        votes: [{user: 'iqNk8OspZw'}, {user: 'pepe'}, {user: 'carlitos'}]
    },
    {
        id: 5,
        title: 'Go crasdazy',
        artist: 'Roberto',
        album: 'Black Album',
        votes: [{user: 'iqNk8OspZw'}, {user: 'pepe'}, {user: 'carlitos'}]
    },
    {
        id: 6,
        title: 'Go crasdazy',
        artist: 'Roberto',
        album: 'Black Album',
        votes: [{user: 'iqNk8OspZw'}, {user: 'pepe'}, {user: 'carlitos'}]
    }
];

const socketSync = {
    init : function (io) {
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
    }
};


module.exports = socketSync;
