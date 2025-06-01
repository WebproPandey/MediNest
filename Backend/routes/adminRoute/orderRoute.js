const express = require("express");
const protect = require("../../middleware/authMiddleware");
const { getAllOrders, updateShippingStatus } = require("../../controllers/adminControllers/orderController");
const router = express.Router();

router.get("/orders", getAllOrders); 
router.patch("/update-shipping/:orderId", updateShippingStatus); 

module.exports = router;