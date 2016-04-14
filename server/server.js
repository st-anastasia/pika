'use strict';

const express   = require('express');
const jwt = require('express-jwt');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const config = require('./config/config.js');

Grid.mongo = mongoose.mongo;
mongoose.connect(config.mongoConnection);
const connection = mongoose.connection;
connection.once('open', () =>{
  app.set('gridfs', Grid(connection.db));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', jwt({ secret: config.tokenSecret }).unless({path: [/^\/api\/session_token/]}));
app.use('/api', require('./routes/session_tokens'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/photos'));

app.listen(config.port);
console.log('Pika running at http://localhost:' + config.port);
