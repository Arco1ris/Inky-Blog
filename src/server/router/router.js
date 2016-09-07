var express = require('express')
var router = express.Router();

var ArticleController = require('../controllers/articleController').ArticleController;
var ArticleController= new ArticleController();

var CategoryController = require('../controllers/categoryController').CategoryController;
var CategoryController= new CategoryController();

var UserController = require('../controllers/userController').UserController;
var UserController= new UserController();

// about user
// validate user
router.post('/api/user',UserController.validateOneUser);

// change userName or password
router.put('/api/user',UserController.changeNameOrPw);


// about articles
// add new article valid
router.post('/api/articles',ArticleController.addArticle);

// find all articles
router.get('/api/articles/:currentPage', ArticleController.findAll);

// find articles by category
router.get('/api/article/title/:category/:action/:currentPage', ArticleController.findArticlesByCategory);

// find one article by id
router.get('/api/article/content/:id', ArticleController.findOneArticle);

// update article valid
router.put('/api/articles',  ArticleController.update);

// move article to trash bin valid
router.put('/api/category/article', ArticleController.moveToTrash);

// do delete article valid
router.delete('/api/articles', ArticleController.delete);


// about categories
//PASS add new category valid
router.post('/api/category', CategoryController.addCategory);
//PASS find all category
router.get('/api/category', CategoryController.findAll);
// do delete category valid
router.delete('/api/category', CategoryController.delete);


module.exports = router;