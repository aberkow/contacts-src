var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String
});

module.exports = mongoose.model('Contact', ContactSchema);
