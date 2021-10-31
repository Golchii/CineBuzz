const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const userdata = require('../models/user');
const sendgrid = require('nodemailer-sendgrid-transport');
const dotenv = require('dotenv/config');
const transport = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: process.env.api
    }
}))  
exports.signupreq = (req , res ,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    console.log(email);
    userdata.findOne({email:email})
    .then(useremail =>{
        if(useremail){
            return res.json('already exist');
        }
        const user = new userdata({
            name:name,
            email:email,
            enterotp:'1234'
        })
        transport.sendMail({
            to:email,
            from:'kyabaathai21@gmail.com',  
            subject:'your OTP',
            html:'<h1> 1234 </h1>'
        })
        user.save();
        res.json("user signup, now set password");
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.otpreq = (req , res ,next)=>{
    const otp = req.body.enterotp;
    console.log(otp)
    userdata.findOne({email:req.body.email})
    .then(otp=>{
        if(req.body.enterotp == '1234')
        return res.json("otp verified");
    })
    .catch(err=>{
        console.log(err);
    })
    // return res.json("verification failed");
}
exports.passreq = async(req ,res ,next)=>{
    // const email = req.body.email;
    const pass = req.body.pass;
    const confirmpass = req.body.confirmpass;
    const hpass = await bcrypt.hash(pass ,10);
    userdata.findOne(userdata)
    .then(()=>{
        if(pass !== confirmpass){
            return res.json('password must be same!');
        }
        return bcrypt.hash(pass ,10)
        .then(hashpass=>{
            const user = userdata({
                email:email,
                pass:hashpass
            })   
            user.save(); 
            res.json("user created");
        })
    })
    
}