const path = require('path');
const express = require('express');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
require('./db/connection');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', jwt({ secret: config.tokenSecret }).unless({ path: '/api/session-token' }));

app.get('/photos/:token', require('./photos/imagesController').show);

app.use('/api', require('./sessions/routes'));
app.use('/api', require('./user/routes'));
app.use('/api', require('./photos/routes'));

app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
