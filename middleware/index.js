const Post= require('../models/Post');
const Comment= require('../models/Comment')
exports.isLoggedIn=(req,res,next)=>{
	if(req.isAuthenticated()){
		
		next();
	}
	else {
		req.flash('error','must be logged');
		res.redirect('/login');
	}
}
exports.isOwnerPost=async (req,res,next)=>{
	if(req.isAuthenticated()){
		try{
			const post = await Post.findById(req.params.id);
			if(!post){
				req.flash('error','Post not found');
				return res.redirect('back');
			}
			else{
				if(req.user._id.equals(post.userId)){
					next(); 
				} else{
					req.flash('error','you donn have permission');
					return res.redirect('back');
				}
			}

		}catch(error){
			req.flash('error','Something went wrong');
			return res.redirect('back');

		}
		
		//next();
	}
	else {
		req.flash('error','you must be logged in');
		res.redirect('back');
	}
}
exports.checkOwnershipComment= async(req,res,next)=>{
	if(req.isAuthenticated){

		try {
			const post = await Post.findById(req.params.id)
			const comment = await Comment.findById(req.params.commentId)
			if(!comment || !post){
				req.flash('error','Something went wrong')
				return res.redirect('back')
			}
			if(comment.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash('error','you dont have permission')
				return res.redirect('back')
			}

		}catch(err){
			console.log(err)
			return res.redirect('back')

		}
		
	}else{
		req.flash('error','you must be logged in')
		return res.redirect('back')
	}
}

