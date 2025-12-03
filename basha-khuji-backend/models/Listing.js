const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  description: String,
  landlordId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', listingSchema);
