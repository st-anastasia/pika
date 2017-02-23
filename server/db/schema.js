const connection = require('../db/connection');
const User = require('../models/user');

// create a user a new user
User.create({username: 'chuck', password: '123456'});
