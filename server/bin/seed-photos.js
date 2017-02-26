const fs = require('fs');
const path = require('path');
faker = require('faker');
const connection = require('../db/connection');
const User = require('../models/user');
const photosController = require('../controllers/photos');

const srcPath = process.argv.slice(2)[0]

const res = {
  json: (code, data) => console.log(data) 
}

const storePhotos = (user) => {
  fs.readdirSync(srcPath)
  .filter( file => !file.startsWith('.') )
  .forEach( file => {
    const req = {
      user: {id: user.id},
      file: {mimetype: 'image/jpeg', path: path.join(srcPath, file)},
      body: {
        metadata: JSON.stringify({
          title: faker.random.words(2),
          description: faker.random.words(10)
        }) 
      }
    }

    photosController.update(req, res);
  });
};

User.findOne({username: 'pika'}).then(storePhotos);
