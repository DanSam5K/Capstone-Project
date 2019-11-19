const db = require('./db/config');

const Article = {
    async getAllArticles(res, req) {
        const findAllArticles = 'SELECT * FROM articles';
        try {
            const { rows } = await config.query(findAllArticles);
            return res.status(200).send({ rows });
        } catch(error) {
            return res.status(400).send(error);
        }
    }     
    
}

module.exports = Article;