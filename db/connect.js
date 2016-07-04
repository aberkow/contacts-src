var mongoose = require('mongoose');

var db = 'mongodb://localhost';
var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connect(db, function(error){
  if (error){
    console.log('Something is wrong in mongoose.connect');
  };
});
