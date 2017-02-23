'use strict';

const express = require('express');
const router = new express.Router();
const userController = require('../controllers/user');

router.get('/user', userController.show);

module.exports = router;
