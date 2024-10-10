const express = require('express');
const { isRegister, isLogin } = require('../controller/auth');
const router =express.Router();

router.post('/register',isRegister)
router.post('/login',isLogin)

module.exports=router