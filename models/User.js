const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Giphy = require('./Giphy');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  gifs: [{
    type: Schema.Types.ObjectId,
    ref: 'Giphy'
  }]
});

module.exports = mongoose.model('User', UserSchema);