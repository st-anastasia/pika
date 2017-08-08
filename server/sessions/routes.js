const express = require('express');

const router = new express.Router();
const sessionTokenController = require('../sessions/tokenController');

router.post('/session-token', sessionTokenController.create);

module.exports = router;
