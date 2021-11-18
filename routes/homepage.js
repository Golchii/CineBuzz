const path = require('path');
const express = require('express');

const router = express.Router();
const user = require('../models/user');
const upload =  require("../utils/multer");
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');

const movieController = require('../controllers/Movie');
//routes

router.get('/trending',movieController.trendingsection);
router.get('/Premiere',movieController.Premieresection);
router.get('/action',movieController.actionsection);
router.get('/comedy',movieController.comedysection);
router.get('/horror',movieController.horrersection);
router.get('/drama',movieController.dramasection);
router.post('/random',movieController.randomfxn);
router.get('/refreshlist',movieController.refreshArr);
router.post('/wishlist',movieController.Allwishlist);
router.post('/history',movieController.history);

//upload dp
const storage = multer.diskStorage({
    destination:(req ,file ,cb)=>{
        cb(null ,'video')
    },
    filename: (req,file ,cb)=>{
        cb(null ,file.originalname);
    }
});
router.put('/dp', upload.single('dp'),async(req ,res)=>{
    try{
        const email = req.body.email;
        user.updateOne({email:email},{dpUrl:req.file.path},{upsert:true})
        // token hoga email ki jagah
        res.statusCode = 201;
        res.json(req.file.path);
    }catch(err){
        res.statusCode = 301;
        console.log(err);
    }
})
module.exports = router;