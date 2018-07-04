const express = require('express');
const path = require('path');
const bp = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//Connect to Database
mongoose.connect(config.database);
//On Connection 
mongoose.connection.on('connected', () => {
    console.log('connected to database' + config.database);
});
//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error' + err);
});



const app = express();
const users = require('./routes/users');

//Port Number
const port = 3000;

//Cors middleware
app.use(cors());

//Set static Folder
//public nothing but client side
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bp.json());
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use("/users", users);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//Start Server
app.listen(port, () => {
    console.log('server started on port' + port);
});