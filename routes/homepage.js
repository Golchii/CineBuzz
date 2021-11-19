const path = require('path');
const express = require('express');

const router = express.Router();
const user = require('../models/user');
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
router.post('/movie/history',movieController.history);
router.post('/history',movieController.showHistory);
router.post('/count',movieController.movieCount);
router.post('/delete/history',movieController.deleteHistory);

//upload dp
const storage = multer.diskStorage({
    destination:(req ,file ,cb)=>{
        cb(null ,'video')
    },
    filename: (req,file ,cb)=>{
        cb(null ,file.originalname);
    }
});
let upload = multer({storage:storage});
router.patch('/dp', upload.single('dp'),async(req ,res)=>{
    try{
        const email = req.body.email;
        user.findOne({email:email},(err,item)=>{
            item.dpUrl = req.file.path;
            item.save();
        })
        // token hoga email ki jagah
        res.statusCode = 201;
        res.json(req.file.path);
    }catch(err){
        res.statusCode = 301;
        console.log(err);
    }
})
module.exports = router;