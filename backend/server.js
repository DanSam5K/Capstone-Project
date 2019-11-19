const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./db/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

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

app
  .route('/articles')
  // GET endpoint
  .get(getArticles)
  // POST endpoint
  .post(addArticles)

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening`)
})