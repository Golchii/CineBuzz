const { size } = require('lodash');
const movieModel = require('../models/moviesmodel');
const user = require('../models/user');
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
    const _id = req.body._id;
    movieModel.findOne({_id:_id},'name rating posterurl videourl genre creater year plot',(err,item)=>{
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
exports.onemovieRatingshow=async(req,res,next)=>{
    movieModel.find({_id:req.body.Movieid},(err,item)=>{
        let sum = 0;
        let l=0;
        for(l = 0; l<size(item[0].ratingArr);l++){
            sum= sum + item[0].ratingArr[l].rating
        }
        console.log(sum/l);
        res.json(sum/l);
        res.statusCode = 201;
    })
}
exports.onemovieRating = async(req , res ,next)=>{
    const userid = req.body.userid;
    const Movieid =req.body.Movieid;
    const rating = req.body.rating;
    const list = {
        userid:userid,
        rating:rating
    }
    movieModel.findOne({_id:Movieid},(err,item)=>{
        let x = true;
        for(var k=0 ; k< size(item.ratingArr); k++){
            if(userid===item.ratingArr[k].userid){
                console.log("again rate");
                item.ratingArr[k].rating = rating;
                item.save();
                x=false;
            }
        }
        if(x===true){
            item.ratingArr.push(list);
            item.save();
        }
    })
    res.json('done');
}
var arr=[];
exports.randomfxn = async(req , res , next)=>{
    movieModel.find({genre:req.body.genre},(err ,item)=>{
        s = size(item);
        
        var x = Math.floor(Math.random()*(s));
        var i=0;
        for(i = 0 ; i < size(arr) ; i++){
            console.log(arr);
            if(size(arr)==s){
                console.log('khatam');
                arr=[];
                res.statusCode=301;
                return res.json('empty');
            }
            if(x==arr[i]){
                console.log('loop')
                x = Math.floor(Math.random()*(s));
                console.log(x);
                i=-1;
            }
        }
        arr.push(x);
        console.log(x);
        res.json(item[x]);
    });
}