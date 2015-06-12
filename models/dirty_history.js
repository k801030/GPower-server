var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dirty_history = new Schema({
  chirpy_id: String,
  history: [{
    member_id: String,
    create_time: Date
  }]

});



module.exports = dirty_history;