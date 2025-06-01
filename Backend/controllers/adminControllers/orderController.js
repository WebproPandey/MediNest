const Order = require("../../models/OrderModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // Populate user details
      .populate("products.productId", "name image price"); // Populate product details

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

exports.updateShippingStatus = async (req, res) => {
  const { orderId } = req.params;
  const { shippingStatus, estimatedDelivery } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.shippingStatus = shippingStatus || order.shippingStatus;
    order.estimatedDelivery = estimatedDelivery || order.estimatedDelivery;
    await order.save();

    res.status(200).json({ success: true, message: "Shipping status updated successfully", order });
  } catch (error) {
    console.error("Error updating shipping status:", error);
    res.status(500).json({ success: false, message: "Failed to update shipping status" });
  }
};