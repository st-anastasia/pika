const mongoose = require('mongoose');

const Photo = require('../models/photo');
const PhotoWriter = require('../models/photo-writer');

const ObjectId = mongoose.Types.ObjectId;
const controller = {};

controller.index = (req, res) => {
  const query = Object.assign({ page: 1, limit: 50 }, req.query);
  const limit = parseInt(query.limit, 10);
  const skip = parseInt(query.page - 1, 10) * limit;

  const options = { 'metadata.owner': ObjectId(req.user.id) };
  if (query.search) options.$text = { $search: query.search };

  Promise.all([
    Photo.find(options).sort({ uploadDate: 'desc' }).skip(skip).limit(limit),
    Photo.find(options).count(),
  ]).then(([photos, totalSize]) => {
    res.json({ photos, totalSize });
  });
};

controller.create = (req, res) => {
  const photo = {file: req.file, metadata: req.body}
  photo.metadata.owner = ObjectId(req.user.id);

  return new PhotoWriter(photo).execute()
    .then(photo => res.status(200).json(photo));
};

controller.delete = (req, res) => {
  const gfs = mongoose.connection.gfs;

  gfs.remove({ _id: req.params.id, root: 'photos' }, (err) => {
    if (err) return res.status(500).json({});

    return res.status(200).json({});
  });
};

module.exports = controller;
