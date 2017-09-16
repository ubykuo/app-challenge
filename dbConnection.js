var mongoose = require('mongoose');

var mongoUrl = "mongodb://appc:v9cCrvEN@ds139994.mlab.com:39994/app-challenge";

mongoose.Promise = require('bluebird');


var connectWithRetry = function () {
	return mongoose.connect(mongoUrl, function (err) {
		if (err) {
			console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
			setTimeout(connectWithRetry,5000);
		}
	});
}

connectWithRetry();

module.exports = mongoose; 