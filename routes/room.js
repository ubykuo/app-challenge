"use strict";
const express = require('express');
const router = express.Router();
const roomController = require(__dirname + '/../controllers/room');

router.get('/:roomId', roomController.get);
router.get('/', roomController.getRooms);

module.exports = router;