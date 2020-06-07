var auth = require('./Auth');
var express = require('express');
var router = express.Router(); 

router.use(auth);

module.exports = router; 
