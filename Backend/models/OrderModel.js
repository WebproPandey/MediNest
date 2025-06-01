const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
 products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Reference Product model
      quantity: { type: Number, required: true },
    },
  ],
  address: {
    type: Object, 
  },
  paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  totalAmount: Number,
  razorpayOrderId: String,
  shippingStatus: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" }, // New field
  estimatedDelivery: { type: Date }, // New field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
