const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const authRoutes = require('./routes/auth');
const homepageRoutes =require('./routes/homepage');
const onemovieRoutes = require('./routes/onemovie');
const csrf = require('csurf');
const multer = require('multer');
const moviesmodel = require('./models/moviesmodel');
const cloudinary = require('./utils/cloudinary');
const upload = require('./utils/multer');
const saveRoutes = require('./routes/save');
const searchRoutes = require('./routes/search');

const app = express();
app.use(express.json());
app.use('/video',express.static(__dirname+'/video'));
const filestorage = multer.diskStorage({
    destination:(req ,file ,cb)=>{
        cb(null ,'video')
    },
    filename: (req,file ,cb)=>{
        cb(null ,file.originalname);
    }
});

app.use((req ,res ,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods',
    'OPTION,GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})
app.use(multer({storage:filestorage}).single('video'))
app.use(authRoutes);
app.use(homepageRoutes);
app.use(onemovieRoutes);
app.use(searchRoutes);
app.use(saveRoutes);
app.use(searchRoutes);
mongoose.connect(process.env.db,()=>{
    console.log('connected');
    app.listen(process.env.port);
});
