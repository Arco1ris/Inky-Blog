var ArticleService = require('../service/articleService').ArticleService;
var ArticleService= new ArticleService();

var CategoryService = require('../service/categoryService').CategoryService;
var CategoryService= new CategoryService();

var returnJson = require('../utils').returnJson;
var isAdmin = require('../utils').isAdmin;
var async = require('async');

ArticleController = function () {}

//PASS find all articles
ArticleController.prototype.findAll = function (req,res) {
    var currentPage = 1;
    if(req.params.currentPage){
        currentPage = req.params.currentPage;
    }
    ArticleService.findAll(currentPage,function (err,docs) {
        console.log(docs);
        res.send(returnJson(err,docs));
    })
}

// PASS add new article and push id to category
ArticleController.prototype.addArticle = function (req,res) {
    // res.header("Content-Type", "application/x-www-form-urlencoded");
    if(isAdmin(req)) {
        ArticleService.insert(req.body,function (err, docs) {
            if(!err) {
                var insertedId =  docs._id.toString();
                CategoryService.pushAndUpdateById(req.body.category,insertedId,function (err,docs) {
                    res.send(returnJson(err,docs));
                })
            } else {
                res.send(returnJson(err,docs));
            }
        })
    } else {
        res.sendStatus(404);
    }
    
}



// find articles by category and pagebreak
ArticleController.prototype.findArticlesByCategory = function (req,res) {
    ArticleService.findArticlesByCategory(req.params, function (err,docs) {
        res.send(returnJson(err,docs));
    })
}

// find one article
ArticleController.prototype.findOneArticle = function (req,res) {
    ArticleService.findById(req.params.id,function (err,docs) {
        res.send(returnJson(err,docs));
    })
}


// update article
ArticleController.prototype.update = function (req,res) {
    if(isAdmin(req)){
        var obj = {};
        for(var key in req.body){
            if(key !== 'articleId'){
                obj[key] = req.body[key];
            }
        }
        var articleId = req.body.articleId;
        var newCategoryId = req.body.category;
    // 此时只需要查询到具体的 category,需要在 DTO 里进行处理
        ArticleService.findById(articleId,function (err,docs) {
            if(!err){
                // object docs
                if(docs.category !== newCategoryId){
                    async.waterfall([
                        async.apply(pullAndUpdateCategory, docs.category,articleId),
                        pushAndUpdateCategory,
                        updateArticle,
                    ], function (err, result) {
                        res.send(returnJson(err,result));
                    });
                    function pullAndUpdateCategory(categoryId,articleId,callback) {
                        CategoryService.pullAndUpdateById(categoryId,articleId,function (err,docs) {
                            callback(err,newCategoryId,articleId);
                        })
                    }
                    function pushAndUpdateCategory(newCategoryId, insertedId, callback) {
                        CategoryService.pushAndUpdateById(newCategoryId,insertedId,function (err,docs) {
                            callback(err,articleId,obj);
                        })
                    }
                    function updateArticle(articleId, obj, callback) {
                        ArticleService.updateById(articleId,obj,function (err,docs) {
                            callback(err,docs);
                        });
                    }
                }else{
                    ArticleService.updateById(articleId,obj,function (err,docs) {
                        res.send(returnJson(err,docs));
                    });
                }
            }
        })
    } else {
        res.sendStatus(404);

    }
}


// move article to trash bin
ArticleController.prototype.moveToTrash = function (req,res) {
    var categoryId = req.body.categoryId;
    var articleId = req.body.articleId;
    var title = ['垃圾箱','Trash'];
    if(isAdmin(req)){
        async.waterfall([
            async.apply(pullAndUpdateCategory, categoryId,articleId),
            pushAndUpdateCategory,
            updateArticle,
        ], function (err, result) {
            res.send(returnJson(err,result));
        });
        function pullAndUpdateCategory(categoryId,articleId,callback) {
            CategoryService.pullAndUpdateById(categoryId,articleId,function (err,docs) {
                callback(err,title,articleId);
            });
        }
        function pushAndUpdateCategory(title, articleId, callback) {
            console.log('title',title,'articleId',articleId);
            CategoryService.pushAndUpdateByTitle(title,articleId,function (err,docs) {
                if(!err && docs) {
                    var newCategory = docs._id.toString();
                    var obj = {category: newCategory};
                    callback(err,articleId,obj);
                }
            })
        }
        function updateArticle(articleId, obj, callback) {
            ArticleService.updateById(articleId,obj,function (err,docs) {
                callback(err,docs);
            });
        }
    } else {
        res.sendStatus(404);

    }

}


// do delete article 
ArticleController.prototype.delete = function (req,res) {
    var categoryId = req.body.categoryId;
    var articleId = req.body.articleId;
    if(isAdmin(req)){
        CategoryService.pullAndUpdateById(categoryId,articleId,function (err,docs) {
            if(!err){
                ArticleService.removeById(articleId,function (err,docs) {
                    res.send(returnJson(err,docs));
                });
            } else {
                res.send(returnJson(err,docs));
            }
        })
    } else {
        res.sendStatus(404);
    
    }
}


exports.ArticleController = ArticleController;