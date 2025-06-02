const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      productName: String,
      price: Number,
      description: String,
      image: String,
      quantity: { type: Number, required: true },
    },
  ],
  address: {
    type: Object,
    required: true,
  },
  paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  totalAmount: Number,
  razorpayOrderId: String,
  shippingStatus: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" },
  estimatedDelivery: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
