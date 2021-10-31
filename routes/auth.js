const path = require('path');
const express = require('express');
const {body} = require('express-validator/check');
const router = express.Router();
// controller
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup');


// router
router.post('/login',loginController.loginReq);
router.post('/signup',signupController.signupreq);
router.post('/otp',signupController.otpreq);
router.post('/password',signupController.passreq)
module.exports = router;