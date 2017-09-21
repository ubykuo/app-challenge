"use strict";
const mongoose = require('../dbConnection.js');

const Schema = mongoose.Schema;

const RoomSchema = new Schema ({
	name: String,
	status: String,
	playlist_id: String,
	owner: {
		name: String,
		spotify_id: String,
		spotify_token: String,
		spotify__refresh_token: String,
		image: String,
	},
	songs: [{
		title: String,
		votes: [{user: String}],
		spotify_id: String,
		artist: String,
        spotify_uri: String
	}]
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;