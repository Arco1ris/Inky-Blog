var UserService = require('../service/userService').UserService;
var UserService= new UserService();
var sha1 = require('sha1');

var returnJson = require('../utils').returnJson;
var async = require('async');

var UserController = function () {}


var sessionJson = require('../utils').sessionJson;

//validate user
UserController.prototype.validateOneUser = function (req,res) {
    console.log('Cookies: ', req.cookies);
    console.log('Sessions: ', req.session);
    var oldUserName = req.body.userName;
    var oldPassword = sha1(req.body.password);
    // 密码加密
    UserService.findByName(oldUserName,function (err,docs) {
        var result = {
            validate:true,
            path:'/admin',
        }
        if(docs.length === 0){
            result = {
                validate:false,
                msg:'账号不存在',
            }
        } else {
            if(docs[0].password !== oldPassword){
                result = {
                    validate:false,
                    msg:'密码错误',
                }
                // 验证失败
            } else {
                req.session.name=oldUserName;
                var sessionId = req.sessionID;
                sessionJson[sessionId] = oldUserName;
                var timestamp = Date.parse(new Date());
                sessionJson['timestamp'] = timestamp;
            }
        }
        res.send(returnJson(err,result));
    })
}

// change user name or password
UserController.prototype.changeNameOrPw = function (req,res) {
    var id = '57a85ecb172d7f605b69053b';
    var oldUserName = 'admin';
    var oldPassword = '123456';
    var obj = {
        userName:'myAdmin',
        password:'1234567890',
    }
    UserService.findById(id,function (err,docs) {
        if(!err){
            if(docs.password !== oldPassword || docs.userName !== oldUserName){
                var result = {
                    validate:false,
                    msg:'账号或密码错误',
                }
                res.send(returnJson(err,result));
            } else {
                UserService.updateById(id,obj,function (err,docs) {
                    var result = {
                        validate:true,
                        data:docs,
                    }
                    res.send(returnJson(err,result));
                })
            }
        } else {
            res.send(returnJson(err,docs));
        }
        
    })
}

exports.sessionJson = sessionJson;
exports.UserController = UserController;