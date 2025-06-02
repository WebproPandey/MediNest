const express = require("express");
const protect = require("../../middleware/authMiddleware");
const { createOrder, verifyPayment, getUserOrders ,cancelOrder} = require("../../controllers/userController/orderController");
const router = express.Router();


router.post("/create-order",  protect('user'), createOrder);
router.delete("/cancel-order/:orderId", protect, cancelOrder);
router.post("/verify-payment",  protect('user'), verifyPayment);
router.get("/my-orders", protect("user"), getUserOrders); 



module.exports = router;
