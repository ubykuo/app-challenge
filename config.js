"use strict";
let config = {};

config.port = process.env.PORT || 8080;
config.db = "mongodb://appc:v9cCrvEN@ds139994.mlab.com:39994/app-challenge";

config.spotify = {};

config.spotify.client_id = "da73848fd0704f87a74b4d5d88dc1642";
config.spotify.client_secret = "fb581f35c8b4481db3889eead31a5e1c";
config.spotify.token_url = 'https://accounts.spotify.com/api/token';

if (process.env.NODE_ENV !== "local") config.spotify.redirect_uri = "http://app-challenge.herokuapp.com/api/auth/";
else config.spotify.redirect_uri = "http://localhost:8080/api/auth/";

module.exports = config;