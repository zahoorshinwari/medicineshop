const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Medicine = require('../models/Medicine');

// Create an order from the cart
const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    const user = req.user; // Get user from the request (from protect middleware)

    // Get the user's cart and populate the items with medicine details
    const cart = await Cart.findOne({ user: user._id }).populate('items.medicine');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Calculate the total price
    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.medicine.price * item.quantity,
      0
    );

    // Create a new order
    const order = new Order({
      user: user._id,
      items: cart.items,
      totalPrice,
      status: 'Pending',
      shippingAddress,
    });

    // Save the order
    await order.save();

    // Clear the cart after the order is placed (or you can update status if you want to keep it)
    await Cart.findOneAndDelete({ user: user._id });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all orders for the user
const getOrders = async (req, res) => {
  try {
    const user = req.user; // Get user from the request (from protect middleware)

    // Fetch all orders for the user
    const orders = await Order.find({ user: user._id });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific order by ID
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user; // Get user from the request (from protect middleware)

    // Fetch the order by ID and ensure it's the user's order
    const order = await Order.findOne({ _id: id, user: user._id });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createOrder, getOrders, getOrder };
