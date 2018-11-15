var express = require('express');
var router = express.Router();
const requestController = require('../controllers').request;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/:trap_id(*)/requests', requestController.index);
router.all('/:trap_id(*)', requestController.create);
module.exports = router;
