
const { pool } = require('./db/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./db/config');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const express = require('express');

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  const getArticles = (request, response) => {
    pool.query('SELECT * FROM articles', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const addArticles = (request, response) => {
    const { title, article, datePosted } = request.body
  
    pool.query('INSERT INTO articles (title, article, datePosted) VALUES ($1, $2, $3)', [title, article, datePosted], error => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'article added.' })
    })
  }
  
  app.route('/articles');
    // GET endpoint
    app.get(getArticles);
    // POST endpoint
    app.post(addArticles);
  



