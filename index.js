"use strict";
const express = require('express');
const config = require(__dirname + '/config');
const bodyParser = require('body-parser')


//Api routes
const auth = require(__dirname + '/routes/auth');

const app = express();

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.set('port', (process.env.PORT || config.port));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api', auth);


app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});