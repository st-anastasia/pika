const express = require('express');
const multer = require('multer');

const router = new express.Router();
const upload = multer({ dest: '/tmp' });
const photosController = require('../controllers/photos');

router.get('/photos', photosController.index);
router.post('/photos', upload.single('photo'), photosController.create);
router.delete('/photos/:id', photosController.delete);

module.exports = router;
