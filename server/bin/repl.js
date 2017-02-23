const repl = require('repl');
const connection = require('../db/connection');

const replServer = repl.start({
  prompt: "pika > ",
});
require('repl.history')(replServer, process.env.HOME + '/.node_history');

replServer.context.connection = connection;
