const mongoose = require('mongoose');

const GiphySchema = mongoose.Schema({
  gif_id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  userId: {
    type: String
  }
});


module.exports = mongoose.model('Giphy', GiphySchema);