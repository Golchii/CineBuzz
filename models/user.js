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
    enterotp:{
        type:String
    }
});
module.exports = mongoose.model('user',userloginschema);