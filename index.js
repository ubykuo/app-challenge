"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const config = require(__dirname + '/config');
const auth = require(__dirname + '/routes/auth');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.set('port', (process.env.PORT || config.port));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

///Setting port
app.set('port', config.port);


//Backend routes
app.use('/api/auth', auth);


//Frontend routes
app.use('/', express.static(__dirname + '/front/dist'));

app.use((req, res) => {
    res.sendFile(__dirname + '/front/dist/index.html');
});

//Start Server
server.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
});