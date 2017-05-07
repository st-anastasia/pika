const connection = require('../db/connection');
const User = require('../models/user');

// create a user a new user
User.create({ username: 'pika', password: '123456' });
