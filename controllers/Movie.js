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
    movieModel.find({section:'Premiere'},'url posterurl name',(err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}
exports.actionsection = async(req ,res ,next)=>{
    movieModel.find({genre:'Action'},'url posterurl name',(err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}
exports.comedysection = async(req ,res ,next)=>{
    movieModel.find({genre:'Comedy'},'url posterurl name',(err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}
exports.horrersection = async(req ,res ,next)=>{
    movieModel.find({genre:'Horrer'},'url posterurl name',(err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}
exports.dramasection = async(req ,res ,next)=>{
    movieModel.find({genre:'Drama'},'url posterurl name',(err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}
exports.onemovie = async(req ,res , next)=>{
    const name = req.body.name;
    movieModel.findOne({name:name},'name videourl genre creater year plot',(err,item)=>{
        if(err){
            console.log(err);
            res.statusCode = 301;
        }
        else{
            console.log(item);
            res.json(item);
        }
    })
}