const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../user/user');

const controller = {};

controller.create = (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password || '';
  if (username === '' || password === '') return res.sendStatus(401);

  return User.findOne({ username }).then((user) => {
    if (user === undefined) throw new Error('user not found');

    return user.comparePassword(password);
  }).then((user) => {
    const token = jwt.sign(
      { id: user._id }, config.tokenSecret
    );

    return res.json({ token });
  }).catch(() => {
    res.sendStatus(401);
  });
};

module.exports = controller;
