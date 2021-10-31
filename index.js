const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const authRoutes = require('./routes/auth');
const csrf = require('csurf');

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

mongoose.connect(process.env.db,()=>{
    console.log('connected');
    app.listen(3000);
});
