"use strict";
const Room = require(__dirname + '/../models/Room.js');
const SpotifyApi = require(__dirname + '/../utils/spotifyApi');
let controller = {};

controller.auth = function (req, res) {
    let spotifyClient = new SpotifyApi();

    spotifyClient.authorizationCodeGrant(req.query.code)
        .then((data) => {
            spotifyClient.setAccessToken(data.body.access_token);
            spotifyClient.setRefreshToken(data.body.refresh_token);
            return spotifyClient.getMe();
        })
        .then((user) => {
            return Room.findOneAndUpdate(
                {"owner.spotify_id": user.body.id},
                {
                    $setOnInsert:
                        {
                            "status": "enabled",
                            "owner.name": user.body.display_name,
                            "owner.spotify_token": spotifyClient.getAccessToken(),
                            "owner.spotify__refresh_token": spotifyClient.getRefreshToken(),
                            "owner.image":user.body.images.url,
                            "songs": []
                        }
                },
                {new: true, upsert: true}
            );

        })
        .then(room => res.redirect("/room/" + room.owner.spotify_id) )
        .catch((error) => {
            console.log("ERROR__", error, error.stack)
            res.status(500).send();
        })

};


module.exports = controller;