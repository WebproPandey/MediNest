const express = require("express");
const protect = require("../../middleware/authMiddleware");
const { addAddress, getAddresses } = require("../../controllers/userController/addressController");

const router = express.Router();

router.post("/add", addAddress);
router.get("/list", getAddresses);

module.exports = router;