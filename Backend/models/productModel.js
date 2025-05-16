const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, default: 0 },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
