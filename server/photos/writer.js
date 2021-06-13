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

    return this.createToken()
      .then(() => {
        return self.createPhotoData();
      })
      .then(() => {
        return self.save();
      });
  }

  save() {
    return new Promise(resolve => {
      const gfs = mongoose.connection.gfs;
      const writeStream = gfs.createWriteStream(this.photoData);
      const readStream = fs.createReadStream(this.photo.file.path);

      writeStream.on('close', photo => {
        this.savedPhoto = photo;
        resolve(photo);
      });

      readStream.pipe(writeStream);
    });
  }

  createPhotoData() {
    return new Promise(resolve => {
      fs.open(this.photo.file.path, 'r', (status, fd) => {
        var buffer = new Buffer(65635);
        fs.read(fd, buffer, 0, 65635, 0, () => {
          const exif = exifParser.create(buffer).parse();
          const metadata = this.photo.metadata || {};
          metadata.tags = exif.tags;
          metadata.imageSize = exif.imageSize;
          metadata.createDate = new Date(metadata.tags.CreateDate * 1000)

          this.photoData = {
            filename: this.token,
            content_type: this.photo.file.mimetype,
            root: 'photos',
            metadata: this.photo.metadata
          };

          resolve(this.photoData);
        });
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
