"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require(__dirname + '/config');
const auth = require(__dirname + '/routes/auth');
const socketSync = require(__dirname + '/socketSync');
const app = express();
const server = require('http').createServer(app);
const room = require(__dirname + '/routes/room');

const io = require('socket.io')(server);

if (process.env.NODE_ENV == "local"){
  let prepareRequests = function (request, response, next) {
    let origin = request.get('origin');
    response.header("Access-Control-Allow-Origin", origin);
    response.header("Access-Control-Allow-Credentials", "true");
    response.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    next();
  };

  app.use(prepareRequests)
}


// search in spotify https://api.spotify.com/v1/search?q=Naistumichiu&type=track
// play items https://api.spotify.com/v1/me/player/play -->> {"uris":["spotify:track:6QsBAmr6MYenvug840GTWD"]}


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



///Setting port
app.set('port', config.port);

//Backend routes
app.use('/api/auth', auth);
app.use('/api/room', room);


//Frontend routes
app.use('/', express.static(__dirname + '/front/dist'));

app.use((req, res) => {
    res.sendFile(__dirname + '/front/dist/index.html');
});

//Init socket
socketSync.init(io);

//Start Server
server.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
});