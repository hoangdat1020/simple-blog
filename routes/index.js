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
	try {
	if (username==='' || password==='') {
		return res.render('register',{error : 'wrong type'});
	}
	else if(user){
		
		return res.render('register',{error : 'User was used'});
	}

	else{
		const newUser = new User({
			username,
			password
		}) ;
		await newUser.save();
		req.flash('success','please login with your account');
		return res.redirect('/');
	}
	}catch(err){
		
		return res.render('register',{ error : "something wrong"});

	}
})

module.exports=router;