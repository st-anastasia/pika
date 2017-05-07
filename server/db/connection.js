const mongoose = require('mongoose');
const connection = mongoose.connection;

if (!connection.db) {
  const Grid = require('gridfs-stream');
  const config = require('../config');

  mongoose.Promise = global.Promise;
  Grid.mongo = mongoose.mongo;

  mongoose.connect(config.mongoConnection).then(() => {
    connection.gfs = Grid(connection.db);
  });
}

module.exports = connection;
