const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if(isNaN(port)) {
    return val;
  }
  if(port >= 0) {
    return port;
  }

  return false;
};
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
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