"use strict";
const Room = require(__dirname + '/../models/Room.js');
const bluebird = require('bluebird');
const SpotifyApi = require(__dirname + '/../utils/spotifyApi');
let controller = {};

controller.auth = function (req, res) {
    let spotifyClient = new SpotifyApi();

    let userPromise = spotifyClient.authorizationCodeGrant(req.query.code)
        .then((data) => {
            spotifyClient.setAccessToken(data.body.access_token);
            spotifyClient.setRefreshToken(data.body.refresh_token);
            return spotifyClient.getMe();
        });


    let playlistPromise = userPromise
        .then((user) => spotifyClient.createPlaylist(user.body.id, "app-challenge"));

    bluebird.join(userPromise, playlistPromise,
        (user, playlist) => {
            return Room.findOneAndUpdate(
                {"owner.spotify_id": user.body.id},
                {
                    $setOnInsert:
                        {
                            "status": "enabled",
                            "owner.name": user.body.display_name,
                            "owner.spotify_token": spotifyClient.getAccessToken(),
                            "owner.spotify__refresh_token": spotifyClient.getRefreshToken(),
                            "owner.image": user.body.images.url,
                            "songs": [],
                            "playlist_id": playlist.body.id
                        }
                },
                {new: true, upsert: true}
            );
        })
        .then(room => {

            req.session.spotify_id = room.owner.spotify_id;
            res.redirect("/room/" + room.owner.spotify_id);
        })
        .catch((error) => {
            console.log("ERROR__", error, error.stack);
            res.status(500).send();
        })

};


module.exports = controller;