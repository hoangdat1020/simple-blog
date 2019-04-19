exports.isLoggedIn=(req,res,next)=>{
	if(req.isAuthenticated()){
	
		next();
	}
	else {
		req.flash('error','must be logged');
		res.redirect('/login');
	}
}