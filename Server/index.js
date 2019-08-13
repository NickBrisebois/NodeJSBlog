const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

/* Configure mongoose's promise to global promise */
mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

/* Initiate app instance */
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(session({
    secret: 'adsfasdfasdf',
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false
}));

if(!isProduction) {
    app.use(errorHandler());
}

// Connect to db
mongoose.connect('mongodb://localhost/nickb', { useNewUrlParser: true });
mongoose.set('debug', !isProduction);
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));


app.listen(8000, () => {
    console.log('Server running on port 8000');
})