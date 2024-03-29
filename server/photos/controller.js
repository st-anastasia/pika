const mongoose = require('mongoose');
const fs = require('fs');

const Photo = require('./photo');
const PhotoWriter = require('./writer');

const ObjectId = mongoose.Types.ObjectId;
const controller = {};

controller.index = (req, res) => {
  const query = Object.assign({ page: 1, limit: 50 }, req.query);
  const limit = parseInt(query.limit, 10);
  const skip = parseInt(query.page - 1, 10) * limit;

  const options = { 'metadata.owner': ObjectId(req.user.id) };
  if (query.search) options.$text = { $search: query.search };
  console.log("id", req.user.id)

  Promise.all([
    Photo.find(options).sort({ 'metadata.createDate': 'desc' }).skip(skip).limit(limit),
    Photo.find(options).count(),
  ]).then(([photos, totalSize]) => {
    res.json({ photos, totalSize });
  });
};

controller.show = (req, res) => {
  Photo.findOne({ _id: req.params.id })
    .then(photo => res.status(200).json({ photo }))
    .catch(() => res.status(500).json({}));
}

controller.create = (req, res) => {
  const metadata = req.body.photo || {}
  metadata.owner = ObjectId(req.user.id);
  const photo = { file: req.file, metadata }

  return new PhotoWriter(photo).execute()
    .then(photo => {
      fs.unlink(req.file.path, () => { });
      res.status(200).json(photo);
    });
};

controller.update = (req, res) => {  
  Photo.update(
    { _id: ObjectId(req.params.id) }, 
    { metadata: req.body.photo }, 
    { strict: false }
  ).then(() => res.status(200).json({}))
  .catch(() => res.status(500).json({}));
};

controller.delete = (req, res) => {
  const gfs = mongoose.connection.gfs;

  gfs.remove({ _id: req.params.id, root: 'photos' }, (err) => {
    if (err) return res.status(500).json({});

    return res.status(200).json({});
  });
};

module.exports = controller;
