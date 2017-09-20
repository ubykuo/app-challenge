"use strict";
const Room = require(__dirname + '/../models/Room.js');
const SpotifyApi = require(__dirname + '/../utils/spotifyApi');
let controller = {};

controller.getRooms = function (req, res) {
    var rooms = Room.find({}, {"owner.name": 1, "owner.spotify_id":1, "owner.image":1}).then(function(result){
        res.json(result);
    });

};

module.exports = controller;