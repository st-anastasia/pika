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

app.get('/photos/:token', require('./controllers/photo-images').show);

app.use('/api', require('./routes/session-tokens'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/photos'));

app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
