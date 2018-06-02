const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const GifSchema = Schema({
  gif_id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Gif', GifSchema);