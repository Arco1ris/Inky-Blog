var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var  User = require('../models/user');

UserService = function(){};

//validate user
UserService.prototype.findById = function(id, callback) {
    User.findById(id, function (err, docs) {
        callback(err,docs);
    });
};

UserService.prototype.findByName = function(name, callback) {
    var query = {userName:name};
    User.find(query).exec(callback);
};


// update article by id
UserService.prototype.updateById = function(id, body, callback) {
    var query = { "_id": ObjectId(id)};
    User.update(query, { $set: body}).exec(callback);
};


exports.UserService = UserService;