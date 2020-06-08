var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 


var Student = new Schema({
	
	name:String, 
	contact:String, 
	email :String, 
	father:String, 
	mother:String, 

}); 



module.exports = mongoose.model('Student', Student);
