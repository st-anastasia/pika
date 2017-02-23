'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const controller = {};

controller.show = function(req, res){
  const gridfs = req.app.get('gridfs');
  const readstream = gridfs.createReadStream({_id: ObjectId(req.params.id), root: 'photos'});
  readstream.pipe(res);

  req.on('error', function(err) {
    res.status(500).send(err);
  });
  readstream.on('error', function (err) {
    res.status(500).send(err);
  });
};

module.exports = controller;
