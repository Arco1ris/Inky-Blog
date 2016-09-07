var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: String,
    password: String,
    isAdmin: Boolean,
});

var User = mongoose.model('user', userSchema,'user');

module.exports = User;
