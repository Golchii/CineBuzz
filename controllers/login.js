const bcrypt = require('bcryptjs');
const userloginmodel = require('../models/user');
exports.loginReq = async(req , res , next)=>{ 
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(email);
    console.log(pass);
    const hpass = await bcrypt.hash(pass ,10)
    console.log(hpass);
    userloginmodel.findOne({email:email,pass:hpass})
    .then(useremail =>{
        if(useremail){
            return res.json('welcome :)');
        }
        return res.json('incorrect email/pass')
    }) 
    .catch(err=>{
        console.log(err);
    })
    
}
