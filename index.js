const express = require('express');
const app = express();
const dotenv= require('dotenv');
dotenv.config()

//template engines
app.set('views', './views');
app.set('view engine', 'pug');


app.get('/', (req, res) => res.render('index'));
app.get('/products',(req,res)=>res.render('products/index'));
const port=process.env.port;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));