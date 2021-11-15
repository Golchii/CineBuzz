const mongoose = require('mongoose');
const { array } = require('../utils/multer');

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
    dpUrl:{
        type:String
    },
    token:{
        type:String
    },
    ratingArr:[{Movieid:String,rating:String}]
});
module.exports = mongoose.model('user',userloginschema);