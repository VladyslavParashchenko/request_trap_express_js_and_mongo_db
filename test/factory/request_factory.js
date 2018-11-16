const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
const adapter = new FactoryGirl.MongooseAdapter();
const Request = require('../../models/request.js');
const faker = require('faker');

factory.setAdapter(adapter);

factory.define('request', Request, {
  trap_id: faker.lorem.word(),
  method: 'GET',
  request_schema: 'http'
});

module.exports = factory;
