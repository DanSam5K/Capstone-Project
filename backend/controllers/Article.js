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
        const findAllArticles = 'SELECT * FROM articles';
        try {
            const { rows } = await config.query(findAllArticles);
            return res.status(200).send({ rows });
        } catch(error) {
            return res.status(400).send(error);
        }
    },     
    
}

module.exports = Article;