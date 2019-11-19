
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



