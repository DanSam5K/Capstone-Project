import db from '../db/config';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

const Gif = {
    async addGif(req, res) {
        const createQuery = `INSERT INTO 
        gif(id, title, gifImg, user_id, datePosted)
        VALUES($1,$2,$3,$4,$5)
        returning *`;
        const values = [
            uuidv4(),
            req.body.title,
            req.body.gifImg,
            req.user.id,
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(201).send(rows[0]);
        } catch(error){
            return res.status(400).send(error);
        }
    },
}

export default Gif;
