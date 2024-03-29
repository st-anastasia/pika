const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  filename: String,
  contentType: String,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  metadata: {
    title: String,
    description: String,
    createDate: Date,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  md5: String,
}, {
  collection: 'photos.files',
  toJSON: {
    transform: (doc, ret) => {
      ret.src = doc.src();
      return ret;
    },
  },
});


PhotoSchema.index({ 'metadata.title': 'text', 'metadata.description': 'text' });

PhotoSchema.methods.src = function () {
  return `/photos/${this.filename}`;
};

module.exports = mongoose.model('Photo', PhotoSchema);
