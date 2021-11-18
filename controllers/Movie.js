const { size } = require('lodash');
const movieModel = require('../models/moviesmodel');
const user = require('../models/user');
exports.trendingsection = async(req ,res ,next)=>{
    movieModel.find({section:'Trending'},'poster name',(err ,item)=>{
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
    movieModel.find({section:'Premiere'},'poster name',(err ,item)=>{
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
    movieModel.find({genre:'Action'},'poster name',(err ,item)=>{
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
    movieModel.find({genre:'Comedy'},'poster name',(err ,item)=>{
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
    movieModel.find({genre:'Horrer'},'poster name',(err ,item)=>{
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
    movieModel.find({genre:'Drama'},'poster name',(err ,item)=>{
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
    movieModel.findOne({_id:_id},'name poster video genre creater plot',(err,item)=>{
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
        res.statusCode = 201;
        console.log(sum/l);
        res.json(sum/l);
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
    res.statusCode =201;
    res.json('done');
}
exports.refreshArr = async(req,res,next)=>{
    var arr=[];
}
exports.randomfxn = async(req , res , next)=>{
    movieModel.find({genre:req.body.genre},(err ,item)=>{
        s = size(item);
        console.log(arr);
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
exports.onemovieReview = async(req ,res ,next)=>{
    const userid = req.body.userid;
    const Movieid = req.body.Movieid;
    const review = req.body.review;
    const list = {
        userid:userid,
        review:review
    }
    movieModel.findOne({_id:Movieid},(err,item)=>{
        let x = true;
        for(var k=0 ; k< size(item.reviewArr); k++){
            if(userid===item.reviewArr[k].userid){
                item.reviewArr[k].review = review;
                item.save();
                x=false;
            }
        }
        if(x===true){
            item.reviewArr.push(list);
            item.save();
        }
    })
}
exports.onemovieReviewshow=async(req,res,next)=>{
    movieModel.find({_id:req.body.Movieid},(err,item)=>{
        console.log(item[0].reviewArr);
        res.json(item[0].reviewArr)
        res.statusCode = 201;
    })
}
exports.onemovieWishlist = async(req,res,next)=>{
    const Movieid =req.body.Movieid;
    const userid = req.body.userid;
    user.findOne({_id:userid},(err,item)=>{
        let x = true;
        console.log(size(item.wishlistArr));
        for(let k =0 ; k<size(item.wishlistArr);k++){
            if(Movieid===item.wishlistArr[k]){
                console.log("again");
                item.wishlistArr.pop();
                res.json('removed from wishlist')
                res.statusCode = 301;
                x=false;
                item.save()
            }
        }
        if(x===true){
            item.wishlistArr.push(Movieid);
            res.statusCode =201;
            res.json('added to wishlist')
            item.save();
        }
    })
}
exports.onemovieWishlistshow = async(req,res,next)=>{
    const Movieid =req.body.Movieid;
    const userid = req.body.userid;
    user.findOne({_id:userid},(err,item)=>{
        let x = true;
        for(let k =0 ; k<size(item.wishlistArr);k++){
            if(Movieid===item.wishlistArr[k]){
                res.json(1);
                x = false;
            }
        }
        if(x===true){
            res.json(0);
        }
    });
}