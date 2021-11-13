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
    console.log(name);
    console.log(email);
    userdata.findOne({email:email}).then(result =>{
        if(result){
            console.log('already exist');
            res.statusCode = 301;
            return res.json('already exist');
        }
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
                otp.save();
            }
            else{
                return otpmodel.findOneAndUpdate({email:email},{otp:OTPgen});
            }   
        })
        transport.sendMail({
            to:email,
            from:'kyabaathai21@gmail.com',  
            subject:'your OTP',
            html:`<h1> your otp is:  ${OTPgen} </h1>`
        })
        res.statusCode=201;
        console.log('otp send');
        res.json("otp send");
    }).catch(err=>{
        console.log(err);
        res.statusCode = 402;
    })
}
exports.otpreq = (req , res ,next)=>{
    const enteredotp = req.body.otp;
    console.log(enteredotp);
    otpmodel.findOne({email:req.body.email})
    .then(OTP=>{
        console.log(OTP.otp);
        if(enteredotp === OTP.otp ){
            res.statusCode = 201;
            console.log('otp verified');
            return res.json("otp verified");
        }
        else{
            res.statusCode = 401;
            console.log('otp verification failed');
            return res.json("verification failed");
        }
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.passreq = async(req ,res ,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    const confirmpass = req.body.confirmpass;
    if(pass !== confirmpass){
        return res.json('password must be same!');
    }
    const hpass = await bcrypt.hash(pass ,10);
    const token = jwt.sign({},process.env.tkn);
    const data = new userdata({
        name:name,
        email:email,
        pass:hpass
    })
    data.save()
    res.statusCode = 201;
    return res.json(token);
}
exports.Rpassreq = async(req ,res ,next)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    const confirmpass = req.body.confirmpass;
    if(pass !== confirmpass){
        res.statusCode = 301;
        return res.json('password must be same!');
    }
    const hpass = await bcrypt.hash(pass ,10);
    res.json('password set');
    res.statusCode = 201;
    const token = jwt.sign({},process.env.tkn); 
    res.json(token);
    return userdata.updateMany({email:email},{pass:hpass});
}
exports.forgotreq = async(req , res ,next)=>{
    const email = req.body.email;
    console.log(email);
    userdata.findOne({email:email}).then(result =>{
        if(!result){
            console.log('email not exist');
            res.statusCode=401;
            return res.json('not exist');
        }
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
                otp.save();
            }
            else{
                return otpmodel.findOneAndUpdate({email:email},{otp:OTPgen});
            }   
        })
        transport.sendMail({
            to:email,
            from:'kyabaathai21@gmail.com',  
            subject:'your OTP',
            html:`<h1> your otp is:${OTPgen} </h1>`
        })
        res.statusCode=201;
        console.log('otp send');
        res.json("otp send");
    })
}