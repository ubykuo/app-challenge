var mongoose = require('../dbConnection.js');

var Schema = mongoose.Schema;

var RoomSchema = new Schema ({
	name: String,
	status: String,
	songs: [{
		title: String,
		votes: [{user: String}],
		spotify_id: String,
		artist: String
	}]
});

var Room = mongoose.model('Room', RoomSchema);

modules.export = Room;