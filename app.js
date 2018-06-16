const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// Let's create a config file to hold our db username and pass
const config = require('./config');

const mongoose = require('mongoose');

// We need to pull in our cloud database url for production
// We'll do a check for the environment using a variable
const env = process.env.NODE_ENV || 'dev';

// Let's get the cloud url and save that to a variable
const mlab_url = `mongodb://${config.db_username}:${config.db_pass}@ds117605.mlab.com:17605/test_db`;
const db_url = 'mongodb://localhost/gt_pt_26';

// Now we can switch the urls based on if we're in production(on Heroku, etc)
mongoose.connect(env === 'dev' ? db_url : mlab_url);
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
