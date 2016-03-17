'use strict';

const express = require('express');
const router = new express.Router();
const user_controller = require('../controllers/user');

router.get('/user', user_controller.show);

module.exports = router;
