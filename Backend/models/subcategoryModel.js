const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  subcategoryName: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subcategory', subcategorySchema);
