//import express
const express = require('express');

//create express app object
const app = express();
const routes = express.Router();

//create a variable to store port
require('dotenv').config();
const PORT = process.env.PORT || 3001;

//body parser
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const checkAuth = require('./middleware/auth');

// import mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
    console.log('db connected...')
}).catch((err)=>{
    console.log('db connection error:',err)
});


app.get('/',(req,res)=>{
    res.json('App is working');
    
});


// import routes
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/room');
//use routes
app.use('/api/auth',authRoutes);

app.use('/api/rooms', checkAuth, roomRoutes);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

// start serve
app.listen(PORT,()=>{
    console.clear();
    console.log(`Server is running: http://localhost:${PORT}`);
});

