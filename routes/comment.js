const router= require('express').Router({mergeParams:true})
const Comment=require('../models/Comment')
const Post = require('../models/Post')
const { isLoggedIn,checkOwnershipComment }= require('../middleware')

router.post('/',isLoggedIn,async(req,res)=>{
	const {text}= req.body
	try{
		//find post by id
		const post =await Post.findById(req.params.id)
		const comment = new Comment({
			text,
			author:{
				id: req.user._id,
				username: req.user.username
			}
		})
		await comment.save()
		post.comments.push(comment)
		await post.save()
		return res.redirect('back')
	}catch(err){
		console.log(err)
		return res.redirect('back')
	}
})
router.post('/:commentId',checkOwnershipComment,async(req,res)=>{
	try{
		const comment= await Comment.findById(req.params.commentId)
		await comment.delete()
		return res.redirect('back')
	}catch(error){
		console.log(err)
		return  res.redirect('back')

	}
})
module.exports= router