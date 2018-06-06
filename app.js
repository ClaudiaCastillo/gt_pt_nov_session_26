const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');

const mongoose = require('mongoose');
//mongodb://<dbuser>:<dbpassword>@ds117605.mlab.com:17605/test_db
const env = process.env.NODE_ENV || 'dev';
const db_url = env == 'dev' ? 'mongodb://localhost/gt_pt_26' : `mongodb://${config.db_username}:${config.db_pass}@ds117605.mlab.com:17605/test_db`;

mongoose.connect(db_url);
mongoose.Promise = Promise;

const api_routes = require('./routes/api_routes');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', api_routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

module.exports = app;
