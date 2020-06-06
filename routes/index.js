var express = require('express');
var router = express.Router();


var facultyRoutes = require('./Faculty/faculty');
var studentRoutes = require('./Student/student'); 




router.use("/faculty", facultyRoutes);
router.use("/student", studentRoutes);

module.exports = router;
