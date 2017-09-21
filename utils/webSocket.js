const Room = require(__dirname + '/../models/Room.js');
const SpotifyApi = require(__dirname + '/spotifyApi');
let helper = {};

helper.addSongToPlaylist = function(song, roomId){
    let spotifyClient = new SpotifyApi();
    return Room.findOne({'owner.spotify_id': roomId})
        .then((room)=>{
            spotifyClient.setAccessToken(room.owner.access_token);
            spotifyClient.setRefreshToken(room.owner.refresh_token);
            return spotifyClient.addTracksToPlaylist(room.owner.spotify_id, room.playlist_id, song.spotify_uri);
        });
};

module.exports = helper;