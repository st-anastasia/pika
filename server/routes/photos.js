

const express = require('express');
const router = new express.Router();
const multer = require('multer');
const upload = multer({ dest: '/tmp' });
const photosController = require('../controllers/photos');

router.get('/photos', photosController.index);
router.put('/photos', upload.single('photo'), photosController.update);

module.exports = router;
