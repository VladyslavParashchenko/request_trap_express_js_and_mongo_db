
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  trap_id: String,
  cookies: {},
  headers: {},
  remote_ip: String,
  request_schema: String,
  method: String,
  createdAt: Date,
  query_params: Object,
  query_string: String
});

module.exports = mongoose.model('Request', RequestSchema);
