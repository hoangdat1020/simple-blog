const mongoose= require ('mongoose');
const Schema= mongoose.Schema;
const postSchema =new Schema({

	tittle:{
		type: String,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	body:{
		type : String,
		required:true
	},
	createdAt: {
		type: Date,
		default :Date.now
	},
	userId:{
		type: Schema.Types.ObjectId,
		ref:'User'
	},
	comments:[
	{
		type: Schema.Types.ObjectId,//
		ref:'Comment'//reference comment model
	}
	]
})
module.exports= mongoose.model('Post',postSchema);