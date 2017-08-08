const mongoose = require('mongoose');
const Photo = require('../photos/photo');

const controller = {};

controller.show = (req, res) => {
  const readPhoto = photo => new Promise((resolve, reject) => {
    const gfs = mongoose.connection.gfs;
    const readstream = gfs.createReadStream({ _id: photo.id, root: 'photos' });
    readstream.pipe(res);

    readstream.on('error', (err) => {
      reject(err);
    });
  });

  Photo.findOne({ filename: req.params.token })
    .then(readPhoto)
    .catch((err) => { res.status(500).send(err); });
};

module.exports = controller;
