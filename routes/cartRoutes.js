// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
// const { protect } = require('../authMiddleware'); // Protect middleware for authentication
const { addToCart, getCart } = require('../controllers/cartController');
const protect = require('../authMiddleware');

// Route for adding an item to the cart
router.post('/add', protect, addToCart);

// Route for getting the user's cart
router.get('/', protect, getCart);

module.exports = router;
