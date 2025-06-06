const express = require("express");
const protect = require("../../middleware/authMiddleware");
const { addAddress, getAddresses } = require("../../controllers/userController/addressController");

const router = express.Router();

router.post("/add", protect("user"), addAddress);
router.get("/list", protect("user"), getAddresses);

module.exports = router;