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
  //weird problem the test router is grabbing contacts from the real db not the testSeed
  it('should list all contacts on GET', function(done){
    chai.request(app)
      .get('/api/contacts')
      .end(function(err, res){
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body[0].should.be.an('object');
        res.body[0].should.have.property('_id').and.be.a('string');
        res.body[0].should.have.property('firstName').and.be.a('string');
        res.body[0].should.have.property('lastName').and.be.a('string');
        res.body[0].should.have.property('phoneNumber').and.be.a('string');
        res.body[0].should.have.property('email').and.be.a('string');
        done();
      });
  });
});
