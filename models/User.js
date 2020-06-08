var express = require('express'),
	mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
	username: String,
	password: String,
	faculty_id: { type: Schema.Types.ObjectId, ref: 'Faculty' }, 
	student_id: { type: Schema.Types.ObjectId, ref: 'Student' }, 
})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User); 