const Order = require("../../models/OrderModel");
const razorpay = require("../../utils/razorpay");

exports.createOrder = async (req, res) => {
  const { cartItems, address, paymentMethod, totalAmount } = req.body;

  const options = {
    amount: totalAmount * 100, // Razorpay accepts amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const razorpayOrder = await razorpay.orders.create(options);

    const products = cartItems.map((item) => ({
      productId: item.id, // Extract product ID from cartItems
      quantity: item.quantity, // Ensure quantity is included
    }));

    const order = await Order.create({
      userId: req.user.id,
      products, // Pass the mapped products array
      address,
      paymentMethod,
      paymentStatus: "Pending",
      razorpayOrderId: razorpayOrder.id,
      totalAmount,
    });

    res.status(201).json({
      message: "Order created successfully",
      razorpayOrder,
      orderId: order._id,
    });
  } catch (error) {
    console.log("createOrder Error:" ,error)
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;

  try {
    const order = await Order.findOne({ razorpayOrderId });
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.paymentStatus = "Paid";
    await order.save();

    res.status(200).json({ message: "Payment verified successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to verify payment" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};