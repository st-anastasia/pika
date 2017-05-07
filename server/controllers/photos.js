const mongoose = require('mongoose');
const crypto = require('crypto');
const base64url = require('base64url');
const fs = require('fs');

const Photo = require('../models/photo');

const ObjectId = mongoose.Types.ObjectId;
const controller = {};

controller.index = function(req, res) {
  const query = Object.assign({ page: 0, limit: 50 }, req.query);
  const limit = parseInt(query.limit, 10);
  const skip = parseInt(query.page - 1, 10) * limit;

  const options = { 'metadata.owner': ObjectId(req.user.id) };
  if (query.search) options.$text = { $search: query.search };

  Promise.all([
    Photo.find(options).skip(skip).limit(limit),
    Photo.find(options).count(),
  ])
  .then(([photos, totalSize]) => {
    res.json({ photos, totalSize });
  });
};

controller.show = function (req, res) {};

controller.update = function (req, res) {
  const generateToken = () => new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(base64url(buf));
    });
  });

  const createPhoto = (token) => {
    const metadata = JSON.parse(req.body.metadata);

    return {
      filename: token,
      content_type: req.file.mimetype,
      root: 'photos',
      metadata: {
        title: metadata.title,
        description: metadata.description,
        owner: ObjectId(req.user.id),
      },
    };
  };

  const write = (photo) => {
    const gfs = mongoose.connection.gfs;
    const readStream = fs.createRedStream(req.file.path);
    const writeStream = gfs.createWriteStream(photo);
    readStream.pipe(writeStream);

    writeStream.on('close', (file) => {
      fs.unlink(req.file.path, () => { res.json(200, file); });
    });
  };

  generateToken().then(token => write(createPhoto(token)));
};

module.exports = controller;
