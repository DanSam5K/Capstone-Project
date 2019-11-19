const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../db/config');

const User = {
    async create(req, res) {
        if(!req.body.email || !req.body.password || !req.body.jobRole) {
            return res.status(400).send({
                'message': 'Some field values are missing'
            });
        }
        if(!Helper.emailIsValid(req.body.email)) {
            return res.status(404).send({
                'message': 'Email Address is invalid'
            });
        }

        const hashPassword = Helper.hashPassword(req.body.password);

        const queryTxt = `INSERT INTO 
        users(id,firstname,lastname,email,password,gender,jobRole,department,address)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
        returning *`;
        const values = [
            uuidv4(),
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hashPassword,
            req.body.gender,
            req.body.jobRole,
            req.body.department,
            req.body.address
        ];

        try {
            const { rows } = await db.query(queryTxt, values);
            const token = Helper.generateToken(rows[0].id);
            return res.status(201).send({token});
        } catch(error) {
            if(error.routine === '_bt_check_unique') {
                return res.status(404).send({
                    'message': 'Email has already been taken'
                });
                
            }
            return res.status(400).send(error);
        }


    },
     /**
      * Create Login
      */

      async signin(req, res) {
          if(!req.body.email || !req.body.password) {
              return res.status(400).send({
                  'message': 'Some values are missing'});
          }
          if(!Helper.emailIsValid(req.body.email)) {
              return res.status(400).send({
                  'message': 'Enter a valid email'
              });
              const queryTxt = 'SELECT * FROM users WHERE email=$1';
              try{
                  const { rows } = await db.query(queryTxt, [req.body.email]);
                  if(!rows[0]) {
                      return res.status(400).send({
                          'message': 'Invalid email address'
                      });
                  }
                  if(!Helper.comparePassword(rows[0].password, req.body.password)) {
                      return res.status(400).send({
                          'message': 'The password is incorrect'
                      });
                  }
                  const token = Helper.generateToken(rows[0].id);
                  return res.status(200).send({ token });
              } catch(error) {
                  return res.status(400).send(error);
              }
          }
      }
}

module.exports = User;