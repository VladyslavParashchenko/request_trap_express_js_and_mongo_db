process.env.NODE_ENV = 'test';
let chai = require('chai');
const factory = require('./factory/request_factory.js');
let expect = chai.expect;
const Request = require('../models/request');
const mongoose = require('mongoose');

describe('Database test', function () {
  beforeEach(function (done) {
    mongoose.connect('mongodb://localhost/db-test', { useNewUrlParser: true }, function () {
      mongoose.connection.db.dropDatabase(function () {
        done();
      });
    });
  });

  it('should save correct request', function (done) {
    let request_data = {
      trap_id: 'trap_id',
      headers: {
        a: '1',
        b: '2'
      },
      cookie: {
        c: '3',
        d: '4'
      },
      request_schema: 'http',
      method: 'GET',
      query_string: 'https://http://requests-trap.com/myshop'
    };
    factory.create('request', request_data)
      .then((request) => {
        Request.find({ trap_id: request['trap_id'] }).then((request) => {
          expect(request[0]['trap_id']).to.equal(request_data.trap_id);
          expect(request[0]['query_params']).to.deep.equal(request_data.params);
          expect(request[0]['method']).to.equal(request_data.method);
          expect(request[0]['request_schema']).to.equal(request_data.request_schema);
          expect(request[0]['query_string']).to.equal(request_data.query_string);
          expect(request[0]['cookie']).to.deep.equal(request_data.cookie);
          done();
        });
      });
  });
});
