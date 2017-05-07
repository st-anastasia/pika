const express = require('express');
const userController = require('../controllers/user');

const router = new express.Router();

router.get('/user', userController.show);

module.exports = router;
