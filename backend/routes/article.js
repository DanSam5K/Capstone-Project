const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth');
const Article = require('../controllers/Article');

//const Articles = process.env.Type === 'db' ? Article: '';

router.post('/', Auth, Article.addArticle);
router.post('/:id', Auth, Article.commentOnArticle);
router.get('/', Auth, Article.getAllArticles);
router.get('/:id', Auth, Article.getSpecificArticle);
router.put('/:id', Auth, Article.updateArticle);
router.delete('/:id', Auth, Article.deleteArticle);

module.exports = router;

