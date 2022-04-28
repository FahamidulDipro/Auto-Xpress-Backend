const express = require('express');
const cors = require('cors');
const port = process.env.PORT||5000;
require('dotenv').config();

const app = express();
//Middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Auto Xpress Server Connected!')
})
app.listen(port,()=>{
    console.log('Server Connected, Enjoy!');
})