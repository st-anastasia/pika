'use strict';
let config = require('../config/config.js'),
  mongoose = require('mongoose'),
  User = require('../models/user');

mongoose.connect(config.mongoConnection, function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

// create a user a new user
let testUser = new User({
  username: 'chuck',
  password: '123456'
});

testUser.save();
process.exit();
