const User = require('../user/user');

const controller = {};

controller.show = (req, res) => {
  const id = req.user.id;

  User.findById(id)
    .select('_id username updatedAt __v')
    .then((user) => {
      if (user === undefined) res.setStatus(404);
      res.json(user);
    });
};

module.exports = controller;
