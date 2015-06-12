var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hunger_history = new Schema({
  chirpy_id: String,
  history: [{
    member_id: String,
    create_time: Date
  }]

});



module.exports = hunger_history;