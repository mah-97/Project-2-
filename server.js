//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const db = mongoose.connection;
require('dotenv').config();

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Error / success
db.on('error', (err) =>
  console.log(err.message + ' is Mongod not running?')
);
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//Use Public folder for Static Assets
app.use(express.static('public'));

//Populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//Use Method-Override
app.use(methodOverride('_method')); // allow POST, PUT and DELETE from a form

//Express-ejs-layouts
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);




//___________________
// Routes
//___________________

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');


// Use Routes
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port:', PORT));
