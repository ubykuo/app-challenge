"use strict";
const mongoose = require('../dbConnection.js');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    current: {},
    songs: [],

}, {
    strict: false

});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;