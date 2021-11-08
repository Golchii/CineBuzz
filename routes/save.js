const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const movieModel =  require('../models/moviesmodel')
const upload =  require("../utils/multer");
router.post('/upload', upload.single('image'),async(req ,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        const movie = new movieModel({
            name:req.body.name,
            url:result.secure_url,
            cloudinary_id:result.public_id
        })
        await movie.save();
        res.json(movie);
    }catch(err){
        console.log(err);
    }
})
module.exports = router