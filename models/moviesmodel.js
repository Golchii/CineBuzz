const mongoose = require('mongoose');
const movieschema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    movie:{
        data:Buffer
    }
})
module.exports = mongoose.model('movies',movieschema);