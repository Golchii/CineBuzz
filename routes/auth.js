const path = require('path');
const express = require('express');
const userdata = require('../models/user');

const router = express.Router();
// controller
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup');
// middleware
const isauth = require('../middleware/isAuth');

// router
router.post('/login',loginController.loginReq);
// router.get('/auth',isauth);
router.post('/forgot',signupController.forgotreq);
router.post('/signup',signupController.signupreq);
router.post('/otp',signupController.otpreq);
router.put('/password',signupController.passreq)
router.put('/resetpass',signupController.Resetpassreq);
router.post('/changepass',signupController.changePassword);


module.exports = router;