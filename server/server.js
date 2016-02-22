'use strict';

const express   = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/config.js');

mongoose.connect(config.mongoConnection);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', require('./routes/session_tokens'));

app.listen(config.port);
console.log('Pika running at http://localhost:' + config.port);
