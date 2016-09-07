var express = require('express');
var assert = require('assert');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var session = require('express-session');


var app = express();
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 


var sess = {
    secret: 'Inky',
    saveUninitialized:false,
    cookie: {
        maxAge:10000000,
    }
}
app.use(session(sess));

var router = express.Router();
app.use('/',router);

var sessionJson = require('./utils').sessionJson;


var url = 'mongodb://localhost:27017/inky';
var mongoose = require('mongoose');
mongoose.connect(url);

app.use('/', require('./router/router'));


router.get('/admin', function(req, res) {
    var sessionId = req.sessionID;
    var timestamp = Date.parse(new Date());
    if( timestamp > sessionJson.timestamp + 100000){
        sessionJson = {};
    }
    // if(sessionJson[sessionId]){
    //     res.sendfile('./dist/admin.html');
    // } else {
    //     // 重定向 到 登录页面
    //     res.redirect('/login');
    // }
    res.sendfile('./dist/admin.html');

});

router.get('/login', function(req, res) {
    var sessionId = req.sessionID;
    var timestamp = Date.parse(new Date());
    if( timestamp > sessionJson.timestamp + 100000){
        sessionJson = {};
    }
    if(sessionJson[sessionId]){
        // 重定向 到 admin
        res.redirect('/admin');
    } else {
        res.sendfile('./dist/login.html');
    }
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});