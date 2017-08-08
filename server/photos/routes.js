const express = require('express');
const multer = require('multer');

const router = new express.Router();
const upload = multer({ dest: '/tmp' });
const photosController = require('../photos/controller');

router.get('/photos', photosController.index);
router.get('/photos/:id', photosController.show);
router.post('/photos', upload.single('photo'), photosController.create);
router.patch('/photos/:id', photosController.update);
router.delete('/photos/:id', photosController.delete);

module.exports = router;
