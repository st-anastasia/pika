const connection = require('../db/connection');
const User = require('../user/user');

// create a user a new user
User.create({ username: 'pika', password: '123456' });
