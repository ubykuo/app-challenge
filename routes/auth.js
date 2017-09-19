"use strict";
const express = require('express');
const router = express.Router();
const authController = require(__dirname + '/../controllers/auth');

router.get('/', authController.auth);

module.exports = router;