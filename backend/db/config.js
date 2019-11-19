
require('dotenv').config()

const { Pool } = require('pg')

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

/**
 * Create an articles table
 */
const createArticlesTable = () => {
  const queryTxt = 
  `CREATE TABLE IF NOT EXISTS
    article(
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      article VARCHAR(255) NOT NULL,
      employee_id UUID NOT NULL,
      image TEXT NOT NULL,
      datePosted timestamp,
      FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE
  )`;

  pool.query(queryTxt)
  .then(
    (res) => {
      console.log(res);
      pool.end();
    }
  )
  .catch(
    (error) => {
      console.log(error);
      ppol.end();
    });
}

/**
 * Create Employee Table 
 */

 const createEmployeeTable = () => {
   const queryTxt = 
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        jobRole VARCHAR(128) NOT NULL,
        department VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
      )`;

      pool.query(queryTxt)
      .then(
        (res) => {
          console.log(res);
          pool.end();
        }
      ).catch(
        (error) => {
          console.log(error);
          pool.end();
        });
 }

 //** CREATE GIF Table*/

 const createGifTable = () => {
   const queryTxt = 
   `CREATE TABLE IF NOT EXISTS
   gif(
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    gifImg TEXT NOT NULL,
    user_id UUID NOT NULL,
    datePosted timestamp,
    FOREIGN KEY (employee_id) REFERENCES users (id) ON DELETE CASCADE
   )`;
   pool.query(queryTxt)
      .then(
        (res) => {
          console.log(res);
          pool.end();
        }
      ).catch(
        (error) => {
          console.log(error);
          pool.end();
        });

 }

 //**Create Comments table */
const createCommentTable = () => {
  const queryTxt = 
  `CREATE TABLE IF NOT EXISTS
  articleComment(
    id UUID PRIMARY KEY,
    comment VARCHAR(255) NOT NULL,
    article_id UUID NOT NULL,
    user_id UUID NOT NULL,
    FOREIGN KEY(article_id) REFERENCES article(id), 
    FOREIGN KEY (user_id) REFEREMCES users(id) ON CASCADE DELETE
  )`
}

 //**CREATE ALL Tables */

 const createAllTables = () => {
   createArticlesTable();
   createEmployeeTable();
   createGifTable();
   createCommentTable();
 }

 pool.on('remove', () => {
   console.log('Client removed');
   process.exit(0);
 })

module.exports = { 
  pool,
  createArticlesTable,
  createEmployeeTable,
  createGifTable,
  createAllTables,
  createCommentTable 
};

require('make-runnable');