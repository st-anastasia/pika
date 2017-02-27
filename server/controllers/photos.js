'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const crypto = require('crypto');
const base64url = require('base64url');
const fs = require("fs");

const config = require('../config');
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

controller.update = function(req, res){
  const generateToken = () => new Promise( (resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(base64url(buf));
    });
  });

  const createPhoto = (token) => {
    const metadata = JSON.parse(req.body.metadata)

    return {
      filename: token,
      content_type: req.file.mimetype,
      root: 'photos',
      metadata: {
        title: metadata.title,
        description: metadata.description,
        owner: ObjectId(req.user.id)
      }
    }
  }
  
  const write = (photo) => {
    const gfs = mongoose.connection.gfs;
    const readStream = fs.createReadStream(req.file.path);
    const writeStream = gfs.createWriteStream(photo);
    readStream.pipe(writeStream);

    writeStream.on('close', (file) => {
      fs.unlink(req.file.path, () => { res.json(200, file) });
    });
  }

  generateToken().then( (token) => write(createPhoto(token)) );
};

module.exports = controller;
