const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const userdata = require('../models/user');
const otpmodel = require('../models/otpmodel');
const jwt = require('jsonwebtoken');
const sendgrid = require('nodemailer-sendgrid-transport');
const dotenv = require('dotenv/config');
const otpgenerator = require('otp-generator');
const user = require('../models/user');
const transport = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: process.env.api
    }
}))  
exports.signupreq = async(req , res ,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    console.log(email);
    const OTPgen = otpgenerator.generate(6 ,{
        digits:true , alphabets : false , uppercase:false,
        specialChars:false
    }); 
    otpmodel.findOne({email:email}).then(result =>{
        if(result===null){
            const otp = new otpmodel({
                email:email,
                otp:OTPgen
            });
            return otp.save();
        }
        else{
            return otpmodel.findOneAndUpdate({email:email},{otp:OTPgen});
        }   
    })
    userdata.findOne({email:email}).then(result =>{
        if(result==null){
            const user = new userdata({
                name:name,
                email:email,
            })
            user.save();
        }
    })
    transport.sendMail({
        to:email,
        from:'kyabaathai21@gmail.com',  
        subject:'your OTP',
        html:`<h1> your otp is:${OTPgen} </h1>`
    })
    res.json("otp send");
}
exports.otpreq = (req , res ,next)=>{
    const enteredotp = req.body.otp;
    console.log(enteredotp);
    otpmodel.findOne({email:req.body.email})
    .then(OTP=>{
        console.log(OTP.otp);
        if(enteredotp === OTP.otp ){
            return res.json("otp verified");
        }
        else{
            return res.json("verification failed");
        }
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.passreq = async(req ,res ,next)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    const confirmpass = req.body.confirmpass;
    if(pass !== confirmpass){
        return res.json('password must be same!');
    }
    const hpass = await bcrypt.hash(pass ,10);
    res.json('password set');
    const token = jwt.sign({},process.env.tkn);
    return userdata.findOneAndUpdate({email:email} ,{pass : hpass ,token:token})
}