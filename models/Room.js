"use strict";
const mongoose = require('../dbConnection.js');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    room_id: String,
    current: {},
    songs: [{
        data: {},
        votes: [{user: String}],
    }],

}, {
    strict: false

});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;