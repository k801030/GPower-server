var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/chirpy");
var Schema = mongoose.Schema;
var chirpy = new Schema({
  name: String,
  satistification: {
    type: Number,
    min: 0,
    max: 10,
    default: 10
  },
  vitamin: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  step: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  },

  updateAt: {
    type: Date,
    default: Date.now
  },
});

var Chirpy = mongoose.model('Chirpy', chirpy);

module.exports = Chirpy;