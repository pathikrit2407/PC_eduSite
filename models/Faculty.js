var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 


var Faculty = new Schema({
	
	name:String, 
	contact:String, 
	email :String, 
	stars:Number, 

}); 



module.exports = mongoose.model('Faculty', Faculty);
