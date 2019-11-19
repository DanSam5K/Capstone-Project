
const { pool } = require('./db/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Article = require('./articles');




app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/', (req, res) => {
    res.send({
        message: 'Endpoint working'
    });
});

app.get('/api/v1/articles', Article.getAllArticles);

//add new route to articles, that runs getArticles
//app.get('/articles', Article.getArticles());
//app.route('/api/v1/articles').get(Article.getAllArticles());
module.exports = app;
