'use strict';
const express = require('express');
const router = new express.Router();
const session_tokens_controller = require('../controllers/session_tokens');

router.post('/session_tokens', session_tokens_controller.create);

module.exports = router;
