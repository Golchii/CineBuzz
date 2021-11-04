const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const authRoutes = require('./routes/auth');
const homepageRoutes =require('./routes/homepage');
const csrf = require('csurf');
const multer = require('multer');

const app = express();
app.use(express.json());
app.get('/',(req ,res , next)=>{
    res.json(' Hello:)');
})
app.get('/next',(req , res , next)=>{
    res.json('nice');
})
app.use((req ,res ,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods',
    'OPTION,GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

app.use(authRoutes);
//multer storage
const movieModel =require('./models/moviesmodel');
const Storage = multer.diskStorage({
    destination:'uploadedMovies',
    filename:(req,file ,cb)=>{
        cb(null,Date.now + file.originalname);
    }  
});
const upload = multer({
    storage:Storage
}).single('newMovie');
app.post('/upload',(req ,res ,next)=>{
    upload(req ,res,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            const newMovie = new movieModel({
                name:req.body.name,
                movie:{
                    data:req.file.filename
                }
            })
            newMovie.save()
            .then(()=>res.send('successfully saved'))
            .catch((err)=>console.log(err))
        }
    })
})
app.use(homepageRoutes);
mongoose.connect(process.env.db,()=>{
    console.log('connected');
    app.listen(3000);
});
