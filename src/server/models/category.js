var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var categorySchema = new Schema({
    myCategory: String,
    articlesId: [String],
    quantity: Number,
});

var Category = mongoose.model('category', categorySchema,'myCategory');

module.exports = Category;
