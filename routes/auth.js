const path = require('path');
const express = require('express');
const {body} = require('express-validator/check');
const router = express.Router();
// controller
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup');
// middleware
const isauth = require('../middleware/isAuth');

// router
router.post('/login',isauth,loginController.loginReq);
// router.get('/auth',isauth);
router.post('/signup',signupController.signupreq);
router.post('/otp',signupController.otpreq);
router.put('/password',signupController.passreq)
module.exports = router;