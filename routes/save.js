const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const movieModel =  require('../models/moviesmodel')
const upload =  require("../utils/multer");
router.post('/upload', upload.single('poster'),async(req ,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        
        const movie = new movieModel({
            section:req.body.section,
            name:req.body.name,
            posterurl:result.secure_url,
            SrNo:req.body.SrNo,
            genre:req.body.genre,
            creater:req.body.creater,
            year:req.body.year,
            plot:req.body.plot,
            rating:req.body.rating,
            videourl:req.body.videourl,
            cloudinary_id:result.public_id
        })
        console.log(movie);
        res.json(movie)
        await movie.save();
        
    }catch(err){
        console.log(err);
    }
})
module.exports = router