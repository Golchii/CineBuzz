const path = require('path');
const express = require('express');

const router = express.Router();
const user = require('../models/user');
const upload =  require("../utils/multer");
const cloudinary = require('../utils/cloudinary');

const trendingController = require('../controllers/trendingMovie');
const { isError } = require('lodash');

router.get('/trending',trendingController.trendingsection);
router.put('/dp', upload.single('dp'),async(req ,res)=>{
    try{
        const email = req.body.email;
        const result = await cloudinary.uploader.upload(req.file.path) 
        await user.updateOne({email:email},{dpUrl:result.secure_url},{upsert:true})
        // token hoga email ki jagah
        res.statusCode = 201;
        res.json('dp updated/created');
    }catch(err){
        console.log(err);
    }
})
module.exports = router;