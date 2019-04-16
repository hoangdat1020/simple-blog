const router = require('express').Router();
const User = require('../models/user.model');
router.get('/',(req,res)=>{
	res.render('index')
})
router.get('/register',(req,res)=>{
	res.render('register')
})
router.post('/register',async (req,res)=> {
	const { username, password }= req.body;
	const user = await User.findOne({username});
	if(user){
		return res.render('register');
	}
	else{
		const newUser = new User({
			username,
			password
		}) ;
		await newUser.save();
		return res.redirect('/');
	}
})

module.exports=router;