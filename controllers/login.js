const bcrypt = require('bcryptjs');
const userloginmodel = require('../models/user');
exports.loginReq = async(req , res , next)=>{ 
    const email = req.body.email;
    const pass = req.body.pass;
    userloginmodel.findOne({email:email}).then(user =>{
        if(!user){
            return res.json('no account exist');
        }
        bcrypt.compare(pass,user.pass).then(result=>{
            if(result){
                return res.json('welcome');
            }
            res.json('incorrect email/pass');
        })
        .catch(err=>{
            console.log(err);
            
        })
    })
}
