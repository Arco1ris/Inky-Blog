var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var  Article = require('../models/article');

var  Category = require('../models/category');

var ArticlePagination = require('../utils').ArticlePagination;



ArticleService = function(){};

//PASS Find all articles
ArticleService.prototype.findAll = function(currentPage,callback) {
    Article.find({}, function (err, docs) {
        if (!err) {
            if (docs.length !== 0){
                var pageNumber = 1;
                var nPerPage = 3;
                if(currentPage){
                    pageNumber = Number(currentPage);
                }
                var sort = { createdTime: -1 };
                ArticlePagination(null, sort, pageNumber, nPerPage, Article, function (err,docs) {
                    docs.result = 1;
                    callback(err,docs);
                });
    
            } else {
                var result = {result:0,docs:docs,total:0,page:1};
                callback(err,result);
            }
        }
    });
};

//PASS find article by id
ArticleService.prototype.findById = function(id, callback) {
    Article.findById(id, function (err, docs) {
        callback(err,docs);
    });
};

// insert new article
ArticleService.prototype.insert = function(params, callback) {
    var article = new Article({title: params['title'], content: params['content'],
        createdTime: params['createdTime'],category: params['category']});
    // 这个 article 自带 ID
    article.save(function (err,docs) {
        callback(err,article);
    });
};

// update article by id
ArticleService.prototype.updateById = function(id, body, callback) {
    var query = { "_id": ObjectId(id)};
    Article.update(query, { $set: body}).exec(callback);
};

// remove article by id
ArticleService.prototype.removeById = function(id, callback) {
    var query = { "_id": ObjectId(id)};
    Article.find(query).remove().exec(callback);

};
// find articles by category
ArticleService.prototype.findArticlesByCategory = function (params, callback) {
    console.log(params);
    Category.findById(params.category, function (err, docs) {
        if (!err) {
            if(docs.articlesId.length !== 0){
                var articleIds = docs.articlesId;
                var pushIds = [];
                for(var i = 0; i < articleIds.length ; i++){
                    pushIds.push(ObjectId(articleIds[i]));
                }
                var pageNumber = 1;
                var nPerPage = 3;
                if(params.currentPage){
                    pageNumber = Number(params.currentPage);
                }
                var sort = { createdTime: -1 };
                ArticlePagination(pushIds,sort, pageNumber, nPerPage, Article, function (err,docs) {
                    docs.docs = docs.docs.map(function (item) {
                        return {title:item.title,createdTime:item.createdTime,category:item.category,id:item.id}
                    })
                    docs.result = 1;
                    callback(err,docs);
                });
    
            } else {
                var result = {result:0,docs:docs,total:0,page:1};
                callback(err,result);
    
            }
        }
    });
}

exports.ArticleService = ArticleService;