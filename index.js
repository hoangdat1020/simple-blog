const express = require('express');
const app = express();
const dotenv= require('dotenv');
dotenv.config()
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const indexRoutes= require('./routes/index');
const postRoutes= require('./routes/post');
const flash = require('connect-flash');
const session = require('express-session');
const commentRoutes = require('./routes/comment');



//connect db
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized : false,
	cookie:{
		maxAge:1000*60*3
	}

}));
app.use(flash());
//setup passport
require('./config/passport')(app);
//setup public folder
app.use(express.static('public'));


//template engines

app.set('view engine', 'ejs');
//custom middle ware
app.use((req,res,next)=>{
	res.locals.currentUser=req.user
	res.locals.error = req.flash('error');
	res.locals.success=req.flash('success');
	next();
});

app.use('/',indexRoutes);
app.use('/post',postRoutes);
app.use('/post/:id/comments',commentRoutes);

const port=process.env.port;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));