"use strict";
const express = require('express');
const config = require(__dirname + '/config');
const bodyParser = require('body-parser');

//Api routes
const auth = require(__dirname + '/routes/auth');

const app = express();
app.set('port', (process.env.PORT || config.port));
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use('/api/auth', auth);

app.use('/', express.static(__dirname + '/front/dist'));

app.use((req, res) => {
  res.sendFile(__dirname + '/front/dist/index.html');
});

server.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});