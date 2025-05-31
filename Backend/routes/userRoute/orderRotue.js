const express = require("express");
const protect = require("../../middleware/authMiddleware");
const { createOrder, verifyPayment } = require("../../controllers/userController/orderController");
const router = express.Router();


router.post("/create-order",  protect('user'), createOrder);
router.post("/verify-payment",  protect('user'), verifyPayment);


module.exports = router;
