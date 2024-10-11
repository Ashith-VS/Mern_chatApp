const express = require('express');
const { getUsersBySearch } = require('../controller/user');
const verifyToken = require('../middleware/verifyMiddleware');
const router = express.Router();

router.get('/findUser',verifyToken, getUsersBySearch);


module.exports = router