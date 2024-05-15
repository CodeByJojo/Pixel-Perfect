const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const postRoutes = require('./routes/posts');
const thankYou = 'Nanna'

const path = require('path');

require('dotenv').config({ path: './config/.env'});

require('./config/passport')(passport);

connectDB();

app.set('view engine', 'ejs');

app.use(express.static('public'));

//tinyEditor
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));

app.use(methodOverride('_method'));

app.use(
    session({
        secret: 'Keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ 
            mongoUrl: process.env.DB_STRING
         }),
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// For errors/ info
app.use(flash());

//Setup routes for server listening
app.use('/', mainRoutes);
app.use('/post', postRoutes);

//Run Server
app.listen(process.env.PORT, () => {
    console.log('Itsa Runnin!');
}); 

