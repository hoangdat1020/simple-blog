var mongoose = require('mongoose');//khai bao nhung cai field co trong OBJ cua chung ta
mongoose.set('useCreateIndex', true);

var userSchema= new mongoose.Schema({
 	username:{
 		type:String,
 		required:true,
 		unique:true
 	},
 	password:{
 		type:String,
 		require:true

 	}

 });
 var User = mongoose.model('User',userSchema,'users');
 module.exports = User;