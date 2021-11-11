const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv/config');
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.cloud_API_key,
    api_secret:process.env.cloud_API_secret
});

module.exports = cloudinary;