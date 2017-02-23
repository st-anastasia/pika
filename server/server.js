'use strict';

const express   = require('express');
const jwt = require('express-jwt');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config.js');
const connection = require('./db/connection');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', jwt({ secret: config.tokenSecret }).unless({path:'/api/session-token'}));

app.get('/photos/:id', require('./controllers/photo-images').show);

app.use('/api', require('./routes/session-tokens'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/photos'));

app.listen(config.port);
console.log('Pika running at http://localhost:' + config.port);
