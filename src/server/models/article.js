var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


var articleSchema = new Schema({
    createdTime : Number,
    title : String,
    category : String,
    content : String,
});

articleSchema.plugin(mongoosePaginate);

var Article = mongoose.model('Article', articleSchema,'inky');

module.exports = Article;
