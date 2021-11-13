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
router.post('/upload_video',(req ,res ,next)=>{
    const videourl = req.file;
    console.log(videourl);
    res.json("https://fd7d-2401-4900-4458-154b-5ded-69fa-eaf-950f.ngrok.io/"+videourl.path);
})
module.exports = router