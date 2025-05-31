const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  phone: String,
  pinCode: String,
  addressLine: String,
  city: String,
  state: String,
  country: { type: String, default: "India" },
  isDefault: { type: Boolean, default: false },
});

module.exports = mongoose.model("Address", addressSchema);
