// controllers/cartController.js
const Cart = require('../models/Cart');
const Medicine = require('../models/Medicine'); // Assuming you have a Medicine model

// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const { medicineId, quantity } = req.body;
    const user = req.user; // Get user from the request (from protect middleware)

    // Check if the medicine exists
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      cart = new Cart({ user: user._id, items: [] });
    }

    // Check if the medicine is already in the cart
    const existingItem = cart.items.find(
      (item) => item.medicine.toString() === medicineId
    );
    if (existingItem) {
      existingItem.quantity += quantity; // Increase quantity if already in the cart
    } else {
      cart.items.push({
        medicine: medicine._id,
        quantity,
      });
    }

    // Save the cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  try {
    const user = req.user; // Get user from the request (from protect middleware)

    // Fetch the user's cart
    const cart = await Cart.findOne({ user: user._id }).populate('items.medicine');

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Your cart is empty' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { addToCart, getCart };
