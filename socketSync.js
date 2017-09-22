const _ = require('lodash');
const wsHelper = require(__dirname + '/utils/webSocket');
const room = require(__dirname + '/models/Room');
let clientsConnected = 0;


const socketSync = {
    init: function (io) {

        io.on('connection', function (client) {

            /*
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
                        room.save();
                        io.in("room-" + roomId).emit('playlist', room.songs);
                    });

            });

            client.on("addSongToPlaylist", (roomId) => {
                let songs;

                console.log("Me piden agregar una cancion a la playlist de spotify");

                room.findOne({"owner.spotify_id": roomId})
                    .then(room => {
                        //ASUMO QUE LA CANCION ESTA
                        console.log("id de la room", roomId);
                        let song  = _.first(room.songs);
                        console.log(room.songs.length);
                        _.remove(room.songs, song);
                        songs = room.songs;
                        console.log(room.songs.length);
                        room.save();
                        wsHelper.addSongToPlaylist(song, roomId, io);
                    })
                    .then((data) => io.in("room-" + roomId).emit('playlist', songs));

            });

            client.on('disconnect', function () {
                clientsConnected = clientsConnected - 1;
                console.log("Clientes conectados: ", clientsConnected);
            });
            */

            client.on('rooms', () => {
                wsHelper
                    .getRooms()
                    .then((rooms) => client.emit('room', rooms));
            });

            client.on('access-room', (room_id) => {
                room
                    .findAndModify({
                        query: {"room_id": room_id},
                        update: {
                            $setOnInsert: {"room_id": room_id}
                        },
                        new: true,   // return new doc if one is upserted
                        upsert: true // insert the document if it does not exist
                    })
                    .then((room) => {
                        client.join(room.room_id);
                        client.emit('rooms', room);
                    });
            });

            client.on('add-song', (user_id, room_id, song) => {
                let songObject = song;
                songObject.votes = [user_id];
                room
                    .findOneAndUpdate({"room_id": room_id}, {$push: {"songs": songObject}}, {new: true, multi: false})
                    .then((room) => {
                        io.to(room.room_id).emit('room')
                    })
            });

            client.on('vote', (user_id, room_id, song)=>{

            });

            client.on('remove', (room_id, song)=>{

            });

            client.on('destroy', (room_id)=>{

            });


        });
    }
};


module.exports = socketSync;
