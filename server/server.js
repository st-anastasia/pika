"use strict";
let express   = require('express'),
  app         = express(),
  config      = require('./config/config.js'),
  bodyParser  = require('body-parser'),
  morgan      = require('morgan'),
  mongoose   = require('mongoose');


mongoose.connect(config.mongoConnection);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', require('./routes/session_tokens'));

app.listen(config.port);
console.log('Pika running at http://localhost:' + config.port);
