"use strict";
let express = require('express'),
  router = new express.Router(),
  session_tokens_controller = require('../controllers/session_tokens');

router.post('/session_tokens', session_tokens_controller.create);

module.exports = router;
