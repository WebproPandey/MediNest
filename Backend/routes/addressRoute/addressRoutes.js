const express = require("express");
const Address = require("../models/Address");
const protect = require("../../middleware/authMiddleware");

const router = express.Router();

// Get All User Addresses
router.get("/", protect('user'), async (req, res) => {
  const addresses = await Address.find({ userId: req.user._id });
  res.json(addresses);
});

// Add New Address
router.post("/", protect('user'), async (req, res) => {
  const address = await Address.create({ ...req.body, userId: req.user._id });
  res.json(address);
});

module.exports = router;
