const mongoose = require('mongoose');
userloginschema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type: String,
    },
    pass:{
        type: String,
    },
    confirmpass:{
        type:String
    },
    token:{
        type:String
    }
});
module.exports = mongoose.model('user',userloginschema);