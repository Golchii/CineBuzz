const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userloginmodel = require('../models/user');
exports.loginReq = async(req , res , next)=>{ 
    const email = req.body.email;
    const pass = req.body.pass;
    const token = jwt.sign({},process.env.tkn);
    userloginmodel.findOneAndUpdate({email:email},{token:token}).then(user =>{
        if(!user){
            res.statusCode = 401;
            return res.json('no account exist');
        }
        bcrypt.compare(pass,user.pass).then(result=>{
            if(result){
                res.statusCode = 201;
                return res.json('welcome');
            }
            res.statusCode = 301;
            res.json('incorrect pass');
        })
        .catch(err=>{
            console.log(err);
        })
    })
}
