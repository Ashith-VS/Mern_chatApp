const express = require('express')
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const chatRoutes = require('./chat');

router.use('/auth', authRoutes)
router.use('/api/user', userRoutes)
router.use('/api/chat', chatRoutes)


module.exports = router