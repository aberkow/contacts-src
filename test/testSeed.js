var Contact = require('../models/contacts');

exports.fixtures = {};

exports.run = function(callback, errback){
  Contact.create(
    [
      {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567',
        email: 'john@johndoe.com'
      },
      {
        firstName: 'Sam',
        lastName: 'Adams',
        phoneNumber: '89012345',
        email: 'sam@sam.com'
      },
      {
        firstName: 'Jill',
        lastName: 'Porter',
        phoneNumber: '43210987',
        email: 'jill@thistest.com'
      }
    ],
    function(err, contacts){
      if (err){
        errback(err);
        return;
      }
      exports.fixtures = contacts;
      callback(contacts);
    }
  );
};

if (require.main === module){
  require('../db/connect');
  exports.run(function(){
    var mongoose = require('mongoose');
  }, function(err){
    console.log(err);
  });
}
