// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
// const { protect } = require('../authMiddleware'); // Protect middleware for authentication
const { createOrder, getOrders, getOrder } = require('../controllers/orderController');
const protect = require('../authMiddleware');

// Route for creating an order from the cart
router.post('/', protect, createOrder);

// Route for getting all orders of the logged-in user
router.get('/', protect, getOrders);

// Route for getting a specific order by ID
router.get('/:id', protect, getOrder);

module.exports = router;
