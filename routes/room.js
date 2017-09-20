"use strict";
const express = require('express');
const router = express.Router();
const roomController = require(__dirname + '/../controllers/room');

router.get('/:roomId', roomController.get);


module.exports = router;