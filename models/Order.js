const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);
