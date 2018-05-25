const mongoose = require('mongoose');

const GiphySchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  userId: {
    type: String
  }
});


module.exports = mongoose.model('Giphy', GiphySchema);