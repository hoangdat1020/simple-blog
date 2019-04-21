const router = require('express').Router();
const User = require('../models/user.model');
const Post = require('../models/Post');
const passport = require('passport');

//show the home page

router.get('/', async(req,res)=>{
	const posts= await Post.find().sort({created: -1}).exec()
	res.render('index',{posts:posts});
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
router.get('/login',(req,res)=>{
	res.render('login');
})
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
router.get('/logout',(req,res)=>{
	req.logout();
	req.flash('success','Logged out!');
	res.redirect('/');
})


module.exports=router;