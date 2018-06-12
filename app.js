const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');

const local_url = 'mongodb://localhost/gt_pt_26';
// We need to secure our pass and username
const db_username = process.env.DB_USERNAME;
const db_pass = process.env.DB_PASS;
const mlab_url = `mongodb://${db_username}:${db_pass}@ds117605.mlab.com:17605/test_db`;
// we need to get the cloud db url

// now we need to setup a variable to see if we're on heroku or not
// if the NODE_ENV is active, we're on heroku, otherwise it'll be set to 'dev'
const env = process.env.NODE_ENV || 'dev';

mongoose.connect(env === 'dev' ? local_url : mlab_url);
mongoose.Promise = Promise;

const api_routes = require('./routes/api_routes');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Ok, so we have our React ready for production. We now need to run build in the client folder
// to generate our build folder
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', api_routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

module.exports = app;
