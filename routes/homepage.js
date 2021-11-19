const path = require('path');
const express = require('express');

const router = express.Router();
const user = require('../models/user');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');

const movieController = require('../controllers/Movie');
const isAuth = require('../middleware/isAuth');
//routes

router.get('/trending',isAuth,movieController.trendingsection);
router.get('/Premiere',isAuth,movieController.Premieresection);
router.get('/action',isAuth,movieController.actionsection);
router.get('/comedy',isAuth,movieController.comedysection);
router.get('/horror',isAuth,movieController.horrersection);
router.get('/drama',isAuth,movieController.dramasection);
router.post('/random',isAuth,movieController.randomfxn);
router.post('/refreshlist',movieController.refreshArr);
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