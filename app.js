var express = require('express')
var session = require('express-session');
var app = express()
var route = require('./routes')
var bodyParser = require("body-parser");




app.set('view engine', 'ejs')
app.set('views', './views')
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 600000 }
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
route(app)



module.exports = app;


