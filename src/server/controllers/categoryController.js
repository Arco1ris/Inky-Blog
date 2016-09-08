var CategoryService = require('../service/categoryService').CategoryService;
var CategoryService= new CategoryService();
var isAdmin = require('../utils').isAdmin;
var returnJson = require('../utils').returnJson;


CategoryController = function () {}

// add new category
CategoryController.prototype.addCategory = function (req,res) {
    if (isAdmin(req)) {
        CategoryService.insert(req.body,function (err,docs) {
            res.send(returnJson(err,docs));
        })
    } else {
        res.sendStatus(404);
    }
}
//PASS find all category
CategoryController.prototype.findAll = function (req,res) {
    CategoryService.findAll(function (err,docs) {
        res.send(returnJson(err,docs));
    })
}

// update category
CategoryController.prototype.update = function (oldId,newId,insertedId,callback) {
    CategoryService.pullAndUpdateById(oldId,insertedId,function (err,docs) {
        CategoryService.pushAndUpdateById(newId,insertedId,function (err,docs) {
            res.send(returnJson(err,docs));
        })
    })
}
// do delete category
CategoryController.prototype.delete = function (req,res) {
    console.log('AAA');
    console.log(req.body);
    console.log('AAAA');
    if(isAdmin(req)){
        CategoryService.removeById(req.body.categoryId,function (err,docs) {
            res.send(returnJson(err,docs));
        });
    } else {
        res.sendStatus(404);
    }
}

exports.CategoryController = CategoryController;
