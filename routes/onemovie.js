const path = require('path');
const express = require('express');
const router = express.Router();

const user = require('../models/user');
const movieModel = require('../models/moviesmodel');

const movieController = require('../controllers/Movie');
//routes
router.post('/movie',movieController.onemovie)
router.put('/movie/rating',movieController.onemovieRating);
router.post('/movie/rating',movieController.onemovieRatingshow);
router.put('/movie/review',movieController.onemovieReview);
router.post('/movie/review',movieController.onemovieReviewshow);
router.put('/movie/wishlist',movieController.onemovieWishlist);
router.post('/movie/wishlist',movieController.onemovieWishlistshow);


module.exports = router;