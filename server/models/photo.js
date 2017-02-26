'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  filename: String,
  contentType: String,
  length: Number,
  chunkSize: Number,
  uploadData: Date,
  metadata: {
    title: String,
    description: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  md5: String,
}, {collection: 'photos.files'});

module.exports = mongoose.model('Photo', PhotoSchema);
