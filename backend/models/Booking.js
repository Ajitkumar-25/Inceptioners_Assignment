const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  travelers: Number,
  specialRequests: String,
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  totalPrice: Number,
});

module.exports = mongoose.model('Booking', bookingSchema);
