const mongoose = require('mongoose');
const { array } = require('../utils/multer');
const movieschema = mongoose.Schema({
    section:{
        type:String
    },
    name:{
        type:String,
    },
    posterurl:{
        type:String
    },
    SrNo:{
        type:Number
    },
    name:{
        type:String
    },
    videourl:{
        type:String
    },
    genre:{
        type:String
    },
    creater:{
        type:String
    },
    year:{
        type:String
    },
    plot:{
        type:String
    },
    rating:{
        type:Number
    },
    cloudinary_id:{
        type:String
    }
})
module.exports = mongoose.model('movies',movieschema);