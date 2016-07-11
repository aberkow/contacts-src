//connect the database to the app.
require('./db/connect');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

//mongoose.connect('mongodb://localhost/');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next){
  //double check that requests are processed
  console.log('Something is happening');
  next();
});

router.get('/', function(req, res){
  console.log(req.body, 'from router.get "/"');
  res.json({ message: 'Success!' });
});

//bring in the controllers
require('./controllers/controllerIndex')(router);

//make sure the routes will be prefixed w api.
app.use('/api', router);
//use the public folder for routes after /
app.use('/', express.static('public'));
//log http status codes nicely.
app.use(morgan('dev'));

//catch all route in case no routes work.
app.use('*', function(req, res){
  res.status(404).json({ message: 'Problem found' });
});

var port = process.env.PORT || 4000;

app.listen(port, function(){
  console.log('Express listening on ' + port);
});

exports.app = app;


// router.route('/contacts')
//   .post(function(req, res){
//     var contact = new Contact();
//     contact.firstName = req.body.firstName;
//     contact.lastName = req.body.lastName;
//     contact.phoneNumber = req.body.phoneNumber;
//     contact.email = req.body.email;
//     console.log(contact, req.body, 'from post');
//     contact.save(function(err){
//       if (err){
//         res.send(err);
//       }
//       res.json({ message: 'Contact created' });
//     });
//   })
//   .get(function(req, res){
//     console.log(req.body);
//     Contact.find(function(err, contacts){
//       if (err){
//         res.send(err);
//       }
//       res.json(contacts);
//     });
//   });
//
// router.route('/contacts/:id')
//   .get(function(req, res){
//     console.log(req.params.id, 'from findById');
//     Contact.findById(req.params.id, function(err, contact){
//       if (err){
//         res.send(err);
//       }
//       res.json(contact);
//     });
//   })
//   .put(function(req, res){
//     Contact.findById(req.params.id, function(err, contact){
//       if (err){
//         res.send(err);
//       }
//       contact.firstName = req.body.firstName;
//       contact.lastName = req.body.lastName;
//       contact.phoneNumber = req.body.phoneNumber;
//       contact.email = req.body.email;
//
//       contact.save(function(err){
//         if (err) {
//           res.send(err);
//         }
//         res.json({message: 'Contact updated'});
//       });
//     });
//   })
//   .delete(function(req, res){
//     Contact.findByIdAndRemove(req.params.id, function(err, contact){
//       if (err){
//         res.send(err);
//       }
//       res.json({message: 'Contact removed'});
//     });
//   });
