'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const controller = {};

controller.create = function(req, res) {
  const username = req.body.username || '';
  const password = req.body.password || '';
  console.log(req.body)
  if (username == '' || password == '') return res.sendStatus(401);
  User.findOne({username: username})
    .then(user => {
      if (user == undefined) throw new Error('user not found');
      return user.comparePassword(password);
    })
    .then(user => {
      const token = jwt.sign({id: user._id}, config.tokenSecret, { expiresIn: config.tokenExpiration });
      return res.json({token:token});
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(401);
    });
};

module.exports = controller;
