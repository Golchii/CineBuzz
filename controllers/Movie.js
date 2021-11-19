const { size, sortBy } = require('lodash');
const { findOne } = require('../models/moviesmodel');
const movieModel = require('../models/moviesmodel');
const user = require('../models/user');
exports.trendingsection = async(req ,res ,next)=>{
    let a = [];
    movieModel.find({},'poster name views',(err ,item)=>{
        if(err){
            console.log(err);
        }
        else{
            for(let i=0 ; i < 5 ; i++){
                a.push(item[i]);
            }
            console.log(a);
            res.json(a);
        }
    }).sort({"views":-1});
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
        console.log((sum/l).toPrecision(2)+"");
        res.json((sum/l).toPrecision(2)+"");
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
var arr=[];
exports.refreshArr = async(req,res,next)=>{
    arr=[];
    res.json('done');
}
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
                res.json('review edited')
                item.save();
                x=false;
            }
        }
        if(x===true){
            item.reviewArr.push(list);
            res.json('review saved')
            item.save();
        }
        res.statusCode = 201;
    })
}
exports.userdetails = async(req,res,next)=>{
    const userid =req.body.userid;
    user.findOne({_id:userid},'dpUrl name',(err,item)=>{
        res.statusCode =202;
        res.json(item)
        console.log(item);
    })
}
exports.onemovieReviewshow=async(req,res,next)=>{
    const Movieid = req.body.Movieid;
    movieModel.findOne({_id:Movieid},async(err,item)=>{
        res.statusCode = 201;
        res.json(item.reviewArr);
        console.log(item.reviewArr);
    })
}
exports.history = async(req ,res ,next)=>{
    const userid = req.body.userid;
    const Movieid = req.body.Movieid;
    user.findOne({_id:userid},(err,item)=>{
        let x = true;
        for(let k = 0 ; k < size(item.history) ; k++){
            if(Movieid===item.history[k]){
                console.log('again');
                res.statusCode = 301;
                res.json('again');
                x = false;
            }
        }
        if(x===true){
            item.history.push(Movieid);
            res.statusCode = 201;
            res.json('added in history');
            item.save();
        }
    })
}
exports.showHistory = async (req , res ,next)=>{
    const userid = req.body.userid;
    user.findOne({_id:userid},(err,item)=>{
        console.log(item.history);
        res.statusCode = 201;
        res.json(item.history);
    })
}
exports.movieCount = async (req ,res ,next)=>{
    const userid = req.body.userid;
    user.findOne({_id:userid},(err,item)=>{
        console.log(size(item.history));
        res.statusCode = 201;
        res.json(size(item.history)+"");
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
                item.wishlistArr.splice(k,1);
                res.statusCode = 301;
                res.json('removed from wishlist')
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
                console.log(1);
                res.json("1");
                x = false;
            }
        }
        if(x===true){
            console.log(0);
            res.json("0");
        }
    });
}
exports.Allwishlist = async (req ,res,next)=>{
    const userid = req.body.userid;
    user.findOne({_id:userid},(err,item)=>{
        console.log(item.wishlistArr);
        res.statusCode = 201;
        res.json(item.wishlistArr);
    })
}
exports.deleteHistory = async(req , res ,next)=>{
    const userid = req.body.userid;
    user.findOne({_id:userid},(err,item)=>{
        item.history=[];
        item.save();
    })
    res.statusCode = 201;
    res.json('history cleared')
}