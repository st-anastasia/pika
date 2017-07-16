const mongoose = require('mongoose');
const crypto = require('crypto');
const base64url = require('base64url');
const fs = require('fs');

const ObjectId = mongoose.Types.ObjectId;

class PhotoWriter {
  constructor(user, file) {
    this.user = user;
    this.file = file;
  }

  execute() {
    const self = this;

    return this.createToken().then(() => {
      self.createPhotoData();

      return self.save().then((photo) => {
        self.deleteFile();

        return photo;
      });
    });
  }

  save() {
    return new Promise((resolve) => {
      const gfs = mongoose.connection.gfs;
      const readStream = fs.createReadStream(this.file.path);
      const writeStream = gfs.createWriteStream(this.photoData);
      readStream.pipe(writeStream);

      writeStream.on('close', (photo) => {
        this.savedPhoto = photo;
        resolve(photo);
      });
    });
  }

  deleteFile() {
    return new Promise(resolve => fs.unlink(this.file.path, resolve));
  }

  createPhotoData() {
    this.photoData = {
      filename: this.token,
      content_type: this.file.mimetype,
      root: 'photos',
      metadata: {
        owner: ObjectId(this.user.id),
      },
    };
  }

  createToken() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => {
        if (err) reject(err);

        this.token = base64url(buf);
        resolve(this.token);
      });
    });
  }
}

module.exports = PhotoWriter;
