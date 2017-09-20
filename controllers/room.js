const Room = require(__dirname + '/../models/Room.js');
const SpotifyApi = require(__dirname + '/../utils/spotifyApi');
const bluebird = require('bluebird');
let controller = {};

controller.get = function (req, res) {
  let roomId =  req.params.roomId;
  let roomPromise = Room.findOne({"owner.spotify_id": roomId});

  let statusPromise =  roomPromise.then((room)=>{
      let spotifyClient = new SpotifyApi();

      spotifyClient.setAccessToken(room.owner.spotify_token);
      spotifyClient.setRefreshToken(room.owner.spotify__refresh_token);

      return spotifyClient.getMyCurrentPlayingTrack();

  });


  bluebird.join(roomPromise, statusPromise,
      (room, status) => {
        let response = {};
        response.songs = room.songs;
        response.isHost = false;

        if (req.hasOwnProperty('session') && req.session.hasOwnProperty("spotify_id")){
            response.isHost = (req.session.spotify_id === room.owner.spotify_id);
        }
        response.isPlaying = status.body.hasOwnProperty('is_playing') ?  status.body.is_playing : false;
        res.json(response);
    })
      .catch((error)=>{
        console.log(error);
        res.status(500).send();
      })

};

module.exports = controller;