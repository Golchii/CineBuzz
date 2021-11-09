const movieModel = require('../models/moviesmodel');
exports.trendingsection = async(req ,res ,next)=>{
    movieModel.find((err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}