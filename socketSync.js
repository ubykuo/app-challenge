const _ = require('lodash');
const wsHelper = require(__dirname + '/utils/webSocket');
const room = require(__dirname + '/models/Room');
let clientsConnected = 0;


//TODO no usar la bd de mongo todo el tiempo , ¿usar redis???. Muchos updates
const socketSync = {
    init: function (io) {

        io.on('connection', function (client) {


            clientsConnected = clientsConnected + 1;

            console.log("Clientes conectados: ", clientsConnected);

            client.on("join", function (roomId) {
                console.log('New client in ' + roomId);
                room.findOne({"owner.spotify_id": roomId})

                    .then((room) => {

                        client.join("room-" + roomId);

                        client.emit('playlist', room.songs);

                    });
            });

            client.on("addSong", function (roomId, song) {
                room.findOne({"owner.spotify_id": roomId})
                    .then((room) => {
                        room.songs.push(song);
                        io.in("room-" + roomId).emit('playlist', room.songs);
                        room.save();
                    });

            });

            client.on("addSongToPlaylist", (roomId) => {
                let songs;//no esta bueno tener esto como global
                room.findOne({"owner.spotify_id": roomId})
                    .then(room => {
                        //ASUMO QUE LA CANCION ESTA
                        let song  = _.first(room.songs);
                        songs = room.songs;
                        wsHelper.addSongToPlaylist(song, roomId, io);
                    })
                    .then((data) => io.in("room-" + roomId).emit('playlist', songs));

            });

            client.on('disconnect', function () {
                clientsConnected = clientsConnected - 1;
                console.log("Clientes conectados: ", clientsConnected);
            });
        });
    }
};


module.exports = socketSync;
