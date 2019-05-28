const router = require('express').Router();
const { isLoggedIn , isOwnerPost } =require('../middleware');
const Post = require('../models/Post');
const comment= require('../models/Comment');


router.get('/new', isLoggedIn ,(req,res)=>{
	res.render('newpost');
})
router.post('/new', isLoggedIn ,async (req,res)=>{
	const { tittle , image ,body } = req.body ;
	try{
		await (new Post({
			tittle,
			image,
			body,
			userId:req.user._id

		}).save());
		return res.redirect('/');
	}catch(err){
		console.log(err) ;
		return res.render ('newpost',{error :'Something went wrong'});
	}
})
router.get('/:id', async (req,res)=>{
	try{
		const post= await Post.findById(req.params.id).populate("comments");//load comment data bang id
		return res.render('showpost',{post:post});

	}catch(err){
		console.log(error);
		return res.redirect('/');

	}
})
router.get('/:id/edit', isOwnerPost,async (req,res)=>{
	try{
		const post= await Post.findById(req.params.id);
		return res.render('editpost',{post:post});

	}catch(err){
		return res.redirect('/');

	}
})
router.post('/:id/edit', isOwnerPost,async (req,res)=>{
	const {tittle,image,body} = req.body;
	try{
		const post= await Post.findById(req.params.id);
		post.tittle =tittle;
		post.image=image;
		post.body=body;
		await post.save();
		//return res.redirect('back');
		return res.redirect(`/post/${req.params.id}`);

	}catch(err){
		return res.redirect('back');

	}
})
router.post('/:id/delete', isOwnerPost,async (req,res)=>{
	//const {tittle,image,body} = req.body;
	try{
		const post= await Post.findById(req.params.id);
		await post.delete();
		//return res.redirect('back');
		return res.redirect('/');

	}catch(err){
		return res.redirect('back');

	}
})


module.exports=router;