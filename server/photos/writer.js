const _ = require('lodash');
const mongoose = require('mongoose');
const crypto = require('crypto');
const base64url = require('base64url');
const fs = require('fs');
const exifParser = require('exif-parser');

class PhotoWriter {
  constructor(photo) {
    this.photo = photo;
  }

  execute() {
    const self = this;

    return this.createToken().then(() => {
      return self.createPhotoData();
    }).then(() => {
      return self.save();
    }).then((photo) => {
      self.deleteFile();

      return photo;
    });
  }

  save() {
    return new Promise((resolve) => {
      const gfs = mongoose.connection.gfs;
      const writeStream = gfs.createWriteStream(this.photoData);
      const readStream = fs.createReadStream(this.photo.file.path);

      writeStream.on('close', (photo) => {
        this.savedPhoto = photo;
        resolve(photo);
      });

      readStream.pipe(writeStream);
    });
  }

  deleteFile() {
    return new Promise(resolve => fs.unlink(this.photo.file.path, resolve));
  }

  createPhotoData() {
    return new Promise((resolve) => {
      const readStream = fs.createReadStream(this.photo.file.path);
      readStream.on('readable', () => {

        let exifBuffer = readStream.read(65535);
        const exif = exifParser.create(exifBuffer).parse();

        this.photoData = {
          filename: this.token,
          content_type: this.photo.file.mimetype,
          root: 'photos',
          metadata: this.photo.metadata,
        };
        _.assign(this.photoData.metadata, _.pick(exif, ['tags', 'imageSize']))

        readStream.destroy();
        resolve(this.photoData);
      });
    });
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
