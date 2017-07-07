const express = require('express');

const router = new express.Router();
const sessionTokenController = require('../controllers/session-token');

router.post('/session-token', sessionTokenController.create);

module.exports = router;
