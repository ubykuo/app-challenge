"use strict";
const mongoose = require('mongoose');

const mongoUrl = "mongodb://appc:v9cCrvEN@ds139994.mlab.com:39994/app-challenge";

mongoose.Promise = require('bluebird');


var connectWithRetry = function () {
	return mongoose.connect(mongoUrl);
};

connectWithRetry();

module.exports = mongoose; 