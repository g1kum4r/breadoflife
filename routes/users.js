var express = require('express');
var router = express.Router();
var userController = require('../controller/user_controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(userController);
  res.send(userController.getUser());
});

module.exports = router;
