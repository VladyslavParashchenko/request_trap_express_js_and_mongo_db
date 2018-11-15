const Request = require('../models/request');
const serializer = require('../serializer/request_serializer');
const pug = require('pug');
module.exports = {
  create (req, res) {
    return Request
      .create(
        {
          cookies: req.cookies,
          headers: req.headers,
          request_schema: req.protocol,
          method: req.method,
          query_params: req.method === 'GET' ? req.query : req.body,
          remote_ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
          query_string: req.protocol + '://' + req.get('host') + req.originalUrl,
          trap_id: req.params.trap_id,
          createdAt: Date.now()
        })
      .then((request) => {
        res.render('request', { title: 'Request was saved', request: serializer.serializeObject(request), path: req.path });
        req.io.emit('newRequest', { 'request': pug.renderFile('views/request-partitial.pug', { request: serializer.serializeObject(request) }) });
      }
      )
      .catch((error) => res.status(400).send(error));
  },

  index (req, res) {
    return Request
      .find({ trap_id: req.params.trap_id })
      .then((requests) => {
        res.render('request_list', { requests: serializer.serializeCollection(requests) });
      });
  }
};
