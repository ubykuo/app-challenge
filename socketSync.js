const _ = require('lodash');
const wsHelper = require(__dirname + '/utils/webSocket');
const Room = require(__dirname + '/models/Room');
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
          Room.find({}).then((rooms) => client.emit('rooms', rooms));
      });

      client.on('access-room', (room_id) => {
        Room
          .update({"room_id": room_id}, {$setOnInsert: {"room_id": room_id}}, {upsert: true, new: true})
          .then((result) => {
            return Room.findOne({"room_id": room_id});
          })
          .then((room) => {
            client.join(room.room_id);
            client.emit('room', room);
          })
      });

      client.on('add-song', (user_id, room_id, song) => {
        let songObject = song;
        songObject.votes = [user_id];
        Room
          .findOneAndUpdate({"room_id": room_id}, {$push: {"songs": songObject}}, {returnNewDocument: true})
          .then((room) => {
            io.to(room.room_id).emit('room', room);
          })
      });

      client.on('vote', (user_id, room_id, song) => {
        Room
          .findOneAndUpdate({
            room_id: room_id,
            "songs.id": song.id
          }, {$push: {"songs.$.votes": user_id}}, {returnNewDocument: true})
          .then((room) => {
            io.to(room.room_id).emit('room', room);
          });
      });

      client.on('remove', (room_id, song) => {
        Room
          .findOne({
            room_id: room_id
          })
          .then(function (room) {
            for (let i = 0; i < room.songs.length; i++) {
              if (room.songs[i].id === song.id) {
                room.songs.splice(i, 1);
                break;
              }
            }
            return room.save();
          })
          .then((room) => {
            io.to(room.room_id).emit('room', room);
          });
      });

      client.on('destroy', (room_id) => {
        Room
          .remove({
            room_id: room_id
          })
          .then(() => {
            io.to(room_id).emit('destroyed');
            return wsHelper
              .getRooms();
          })
          .then((rooms) => client.emit('rooms', rooms));
      });

      client.on('next', (room_id) => {
        Room
          .findOne({
            room_id: room_id
          })
          .then((room) => {
            if (room.songs.length) {
              let nextSong = null, max = -1;
              for (let i = 0; i < room.songs.length; i++) {
                if (room.songs[i].votes.length > max) {
                  max = room.songs[i].votes.length;
                  nextSong = room.songs[i];
                }
              }
              room.current = nextSong;

              for (let i = 0; i < room.songs.length; i++) {
                if (room.songs[i].id === nextSong.id) {
                  room.songs.splice(i, 1);
                  break;
                }
              }
              return room.save()
                .then((room) => {
                  io.to(room.room_id).emit('room', room);
                });
            }
          })
      });

    });
  }
};


module.exports = socketSync;
