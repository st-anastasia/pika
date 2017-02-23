'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const fs = require("fs");
const Photo = require('../models/photo');
const controller = {};

controller.index = function(req, res){
  const page = Object.assign({offset: 0, limit: 50}, req.page);

  Photo.find({"metadata.owner": ObjectId(req.user.id)})
    .skip(page.offset)
    .limit(page.limit)
    .then((photos) => { res.json(photos) });
};

controller.show = function(req, res){};

controller.create = function(req, res){
  const gfs = mongoose.connection.gfs;

  const photo = req.file;
  const metadata = JSON.parse(req.body.metadata)

  const readStream = fs.createReadStream(photo.path);
  const writeStream = gfs.createWriteStream({
    filename: photo.filename,
    content_type: photo.mimetype,
    root: 'photos',
    metadata: {
      title: metadata.title,
      description: metadata.description,
      owner: ObjectId(req.user.id)
    }
  });
  readStream.pipe(writeStream);

  writeStream.on('close', (file) => {
    fs.unlink(photo.path, () => { res.json(200, file) });
  });
};

controller.update = function(req, res){

};

module.exports = controller;
