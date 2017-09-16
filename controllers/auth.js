"use strict";
let controller = {};

controller.auth = function (req, res) {
	console.log(req.body.token);
	res.status(200).send();
}


module.exports = controller;