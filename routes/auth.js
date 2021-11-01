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
router.post('/login',[body('email').isEmail()
.withMessage('please enter valid email')
.normalizeEmail(),body('pass').trim().isLength({min:8, max:16})
],loginController.loginReq);
router.post('/signup',isauth,signupController.signupreq);
router.post('/otp',signupController.otpreq);
router.put('/password',signupController.passreq)
module.exports = router;