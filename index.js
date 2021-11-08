const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const authRoutes = require('./routes/auth');
const homepageRoutes =require('./routes/homepage');
const csrf = require('csurf');
const multer = require('multer');
const moviesmodel = require('./models/moviesmodel');
const cloudinary = require('./utils/cloudinary');
const upload = require('./utils/multer');
const saveRoutes = require('./routes/save');

const app = express();
app.use(express.json());

app.use((req ,res ,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods',
    'OPTION,GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

app.use(authRoutes);
app.use(saveRoutes);
//multer storage
// const filestorage = multer.diskStorage({
//     destination:(req ,file ,cb)=>{
//         cb(null ,'uploadedMovies');
//     },
//     filename:(req ,file,cb)=>{
//         cb(null,file.originalname);
//     }
// })
// const upl = (multer({storage:filestorage}).single('image'))
// app.post('/upload',(req ,res ,next)=>{
//     upload(req ,res ,async(err)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             const result = await cloudinary.uploader.upload(req.file.path);
//             res.json(result);
//         }
//     })
// }) 
// 
// const Storage = multer.diskStorage({
//     destination:'uploadedMovies',
//     filename:(req,file ,cb)=>{
//         cb(null,file.originalname);
//     }  
// });
// const upload = multer({
//     storage:Storage
// }).single('newMovie');

// app.post('/upload',(req ,res ,next)=>{
//     upload(req ,res,(err)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             const newMovie = new movieModel({
//                 name:req.body.name,
//                 movie:{
//                     data:path.join(__dirname + '/uploadedMovies/' + req.file.filename)
//                 },
//                 url:req.body.filename
//             })
//             newMovie.save()
//             .then(()=>res.send('successfully saved'))
//             .catch((err)=>console.log(err))
//         }
//     })
// })
// app.use(homepageRoutes);
mongoose.connect(process.env.db,()=>{
    console.log('connected');
    app.listen(3000);
});
