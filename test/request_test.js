process.env.NODE_ENV = 'test';
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const mongoose = require('mongoose');

beforeEach(function (done) {
  mongoose.connect('mongodb://localhost/db-test', { useNewUrlParser: true }, function () {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });
});

describe('GET /:trap_id', function () {
  it('response success', function (done) {
    chai.request(app)
      .get('/trap_id')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});

describe('/', function () {
  it('response success', function (done) {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});

describe('/:trap_id/requests', function () {
  it('response success', function (done) {
    chai.request(app)
      .get('/trap_id/requests')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});
