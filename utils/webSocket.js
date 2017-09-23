const Room = require(__dirname + '/../models/Room.js');
let helper = {};

helper.getRooms = function(){
    Room.find({});
};

module.exports = helper;