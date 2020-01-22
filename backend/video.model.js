const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Video = new Schema({
  title: {
    type: String
  },
  linkid: {
    type: String
  },
  rating: {
    type: Number
  },
  index: {
    type: Number
  }
});

module.exports = mongoose.model('Video', Video);