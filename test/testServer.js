var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Contact = require('../models/contacts');
var testSeed = require('./testSeed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Contacts', function(){
  before(function(done){
    testSeed.run(function(){
      done();
    });
  });
  it('should list all contacts on GET', function(done){
    chai.request(app)
      .get('/api/contacts')
      .end(function(err, res){
        res.should.have.status(200);
      });
  });
});
