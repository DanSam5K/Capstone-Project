import db from '../db/config';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

const Article = {

    async addArticle(req, res) {
        const createQuery = `INSERT INTO 
        article(id, title, article, employee_id, image, datePosted)
        VALUES($1,$2,$3,$4,$5,$6)
        returning *`;
        const values = [
            uuidv4(),
            req.body.title,
            req.body.article,
            req.user.id,
            req.body.image,
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(201).send(rows[0]);
        } catch(error){
            return res.status(400).send(error);
        }
    },
    async getAllArticles(req, res) {
        const findAllArticles = 'SELECT * FROM articles returning *';
        try {
            const { rows } = await config.query(findAllArticles);
            return res.status(200).send({ rows });
        } catch(error) {
            return res.status(400).send(error);
        }
    }, 
    
    async getSpecificArticle(req, res) {
        const getOne = 'SELECT * FROM article WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(getOne, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    'message': 'Oops article not found'
                });
            }
            return res.status(200).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },

    async deleteArticle(req, res) {
        const deleteQuery = 'DELETE FROM article WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    'message': 'Oops attempt to remove an article that does not exist'
                });
            }
            return res.status(204).send({
                'message': 'Article deleted'
            });
        } catch(error) {
            return res.status(400).send(error);
        }
    }, 

    async updateArticle(req, res) {
        const getOne = 'SELECT * FROM article WHERE id=$1';
        const updateQuery = `UPDATE article
         SET title=$1, article=$2, image=$3, datePosted=$3 WHERE id=$4 returning *`;
         try {
             const { rows } = await db.query(getOne, [req.params.id]);
             if(!rows[0]) {
                 return res.status(404).send({
                     'message': 'Article not found'
                 });
             }
             const values = [
                 req.body.title || rows[0].title,
                 req.body.article || rows[0].article,
                 req.body.image || rowss[0].image,
                 moment(new Date()),
                 req.params.id
             ];
             const response =await db.query(updateQuery, values);
             return res.status(201).status(response.rows[0]);
         } catch(error) {
             return res.status(400).send(error);
         }
    }
    
}

module.exports = Article;