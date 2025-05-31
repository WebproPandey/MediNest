const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  address: {
    type: Object, 
  },
  paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  totalAmount: Number,
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
