const express = require('express');
const userController = require('../user/controller');

const router = new express.Router();

router.get('/user', userController.show);

module.exports = router;
