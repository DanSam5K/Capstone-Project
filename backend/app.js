
const { pool } = require('./db/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Auth = require('./middleware/Auth');
const articleRoutes = require('./routes/article');
const gifRoutes = require('./routes/gif');
const userRoutes = require('./routes/user');
const app = express();
dotenv.config();
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

app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/gifs', gifRoutes);
app.use('/api/auth', userRoutes);



//routes for article


//add new route to articles, that runs getArticles
//app.get('/articles', Article.getArticles());
//app.route('/api/v1/articles').get(Article.getAllArticles());
module.exports = app;
