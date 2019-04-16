 const express = require('express');
const app = express();
const dotenv= require('dotenv');
dotenv.config()
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const indexRoutes= require('./routes/index');
const flash = require('connect-flash');
//connect db
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

//template engines

app.set('view engine', 'ejs');


app.use('/',indexRoutes);
const port=process.env.port;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));