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
    wishlistArr:[{Movieid:String,wishlist:Number}]
});
module.exports = mongoose.model('user',userloginschema);