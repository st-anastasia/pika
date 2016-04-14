'use strict';

const express = require('express');
const router = new express.Router();
const multer  = require('multer');
const upload = multer({ dest: '/tmp' });
const photos_controller = require('../controllers/photos');

router.get('/photos', photos_controller.index);
router.post('/photos', upload.single('photo'), photos_controller.create);

module.exports = router;
