const mongoose = require('mongoose');
const movieschema = mongoose.Schema({
    section:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    url:{
        type:String
    },
    cloudinary_id:{
        type:String
    }
})
module.exports = mongoose.model('movies',movieschema);