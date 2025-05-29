const mongoose  =  require ("mongoose");

const consultationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  address: String,
  problem: String,
  image: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Consultation", consultationSchema);
