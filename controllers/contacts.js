var Contact = require('../models/contacts');

//exports a function that will extend the router. the function()() syntax allows two functions to be run consecutively(?).
exports.default = function(router){
  router.route('/contacts')
    .post(function(req, res){

      var contact = new Contact();
      console.log(contact, req.body, 'from post');
      contact.firstName = req.body.firstName;
      contact.lastName = req.body.lastName;
      contact.phoneNumber = req.body.phoneNumber;
      contact.email = req.body.email;

      contact.save(function(err){
        if (err){
          res.send(err);
        }
        res.json({ message: 'Contact created' });
      });
    })
    .get(function(req, res){
      console.log(req.body);
      Contact.find(function(err, contacts){
        if (err){
          res.send(err);
        }
        res.json(contacts);
      });
    });

  router.route('/contacts/:id')
    .get(function(req, res){
      console.log(req.params.id, 'from findById');
      Contact.findById(req.params.id, function(err, contact){
        if (err){
          res.send(err);
        }
        res.json(contact);
      });
    })
    .put(function(req, res){
      Contact.findById(req.params.id, function(err, contact){
        if (err){
          res.send(err);
        }
        console.log(req.body, 'from PUT');
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.phoneNumber = req.body.phoneNumber;
        contact.email = req.body.email;

        contact.save(function(err){
          if (err) {
            res.send(err);
          }
          res.json({message: 'Contact updated'});
        });
      });
    })
    .delete(function(req, res){
      Contact.findByIdAndRemove(req.params.id, function(err, contact){
        console.log(req.params.id, 'from DELETE');
        if (err){
          res.send(err);
        }
        res.json({message: 'Contact removed'});
      });
    });
}
