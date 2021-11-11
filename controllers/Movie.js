const movieModel = require('../models/moviesmodel');
exports.trendingsection = async(req ,res ,next)=>{
    movieModel.find({section:'Trending'},'url posterurl name',(err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}

exports.Premieresection = async(req , res ,next)=>{
    movieModel.find({section:'Premiere'},(err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}