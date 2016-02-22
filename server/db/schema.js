'use strict';

const mongoose  = require('mongoose');
const config = require('../config/config.js');
const User = require('../models/user');

mongoose.connect(config.mongoConnection, function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

// create a user a new user
const testUser = new User({
  username: 'chuck',
  password: '123456'
});

testUser.save();
process.exit();
