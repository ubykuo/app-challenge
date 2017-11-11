"use strict";
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;

mongoose.Promise = require('bluebird');


var connectWithRetry = function () {
	return mongoose.connect(mongoUrl);
};

connectWithRetry();

module.exports = mongoose; 