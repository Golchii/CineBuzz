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
            url:result.secure_url,
            cloudinary_id:result.public_id
        })
        console.log(movie);
        res.json(movie._id)
        await movie.save();
        
    }catch(err){
        console.log(err);
    }
})
module.exports = router