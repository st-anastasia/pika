'use strict';

const express = require('express');
const router = new express.Router();
const session_token_controller = require('../controllers/session_token');

router.post('/session_token', session_token_controller.create);

module.exports = router;
