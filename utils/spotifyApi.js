"use strict";
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyConfig = require(__dirname + '/../config' ).spotify;

module.exports = function () {
    return new SpotifyWebApi({
        clientId: spotifyConfig.client_id,
        clientSecret: spotifyConfig.client_secret,
        redirectUri: spotifyConfig.redirect_uri,
    })
};