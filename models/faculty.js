var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose'); 

var Faculty = new Schema({
	username:String, 
	password:String, 
	name:String, 
	contact:String, 
	email :String, 
	stars:Number, 

}); 

Faculty.plugin(passportLocalMongoose);

module.exports = mongoose.model('Faculty', Faculty);
