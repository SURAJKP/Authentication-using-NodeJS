const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/APIAthuentication');
var db = mongoose.connection;

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routers
app.use('/users', require('./routes/users'));


//Start the server
app.listen(10000,()=>{
    console.log('server listening at 1111');
})


