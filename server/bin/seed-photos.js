const fs = require('fs');
const path = require('path');
const faker = require('faker');
const connection = require('../db/connection');
const User = require('../user/user');
const PhotoWriter = require('../photos/writer');

const srcPath = process.argv.slice(2)[0];

const res = {
  json: (code, data) => console.log(data)
};

const storePhotos = user => {
  console.log("reading: ", srcPath); 
  console.log("user", user);

  fs
    .readdirSync(srcPath)
    .filter(file => !file.startsWith('.'))
    .forEach(file => {
      console.log("Storing: ", file);

      const photo = {
        file: { mimetype: 'image/jpeg', path: path.join(srcPath, file) },
        metadata: {
          owner: user._id,
          title: faker.random.words(2),
          description: faker.random.words(10),
        },
      };

      new PhotoWriter(photo).execute();
    });
};

User.findOne({ username: 'pika' }).then(storePhotos);
