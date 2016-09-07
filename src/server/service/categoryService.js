var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var  Category = require('../models/category');

CategoryService = function () {}

// update by id and push
CategoryService.prototype.pushAndUpdateById = function(id, insertedId, callback) {
    var query = { "_id": ObjectId(id)};
    console.log(query);
    Category.findOneAndUpdate(query,{ $push:
    { articlesId: insertedId }, $inc: {quantity: +1} }, function (err, docs) {
        callback(err, docs);
    });
};
// update by name and push
CategoryService.prototype.pushAndUpdateByTitle = function(title, insertedId, callback) {
    var query = {myCategory:{$in:title}};
    Category.findOneAndUpdate(query,{ $push:
    { articlesId: insertedId }, $inc: {quantity: +1} }, function (err, docs) {
        callback(err, docs);
    });
};
// update by id and pull
CategoryService.prototype.pullAndUpdateById = function(id, insertedId, callback) {
    var query = { "_id": ObjectId(id)};
    Category.findOneAndUpdate(query,{ $pull:
    { articlesId: insertedId }, $inc: {quantity: -1} }, function (err, docs) {
        callback(err, docs);
    });
};

// insert new category
CategoryService.prototype.insert = function(params, callback) {
    var category = new Category({myCategory: params['newCategory']});
    category.save(function (err, docs) {
        callback(err,docs);
    });
};

// find all category
CategoryService.prototype.findAll = function(callback) {
    Category.find({}, function (err, docs) {
        callback( err, docs )
    });
};

// find category by id
CategoryService.prototype.findById = function(id, callback) {
    Category.findById(id, function (err, docs) {
        callback(err, docs);
    });
};

// remove category by id
CategoryService.prototype.removeById = function(id,callback) {
    var query = { "_id": ObjectId(id)};
    Category.find(query).lt('quantity', 1).remove().exec(callback);
};



exports.CategoryService = CategoryService;