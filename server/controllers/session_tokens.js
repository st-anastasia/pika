"use strict";
let User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config.js'),
    controller = {};

controller.create = function(req, res) {
  var username = req.body.username || '';
  var password = req.body.password || '';
  if (username == '' || password == '') return res.sendStatus(401);

  User.findOne({username: username})
    .then(user => {
      if (user == undefined) throw new Error('user not found');
      return user.comparePassword(password)
    })
    .then(user => {
      let token = jwt.sign({id: user._id}, config.tokenSecret, { expiresIn: config.tokenExpiration });
      return res.json({token:token});
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(401);
    });
};

module.exports = controller;
