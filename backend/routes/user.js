const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');

router.post('/create-user', userCtrl.create);
router.post('/sigin', userCtrl.signin);

module.exports = router;