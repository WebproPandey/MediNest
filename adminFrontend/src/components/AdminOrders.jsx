import React, { useEffect, useState } from "react";
import api from "../api/apiInstance";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/admin/orders");
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateShipping = async (orderId, status) => {
    try {
      const estimatedDelivery =
        status === "Delivered"
          ? new Date()
          : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000); // 4 days from now

      await api.patch(`/admin/update-shipping/${orderId}`, {
        shippingStatus: status,
        estimatedDelivery,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, shippingStatus: status, estimatedDelivery }
            : order
        )
      );
      alert(`Shipping status updated to "${status}"`);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update shipping status.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Admin Order Management</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-2xl p-5 mb-6 border border-gray-200"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              👤 Customer: {order.userId.name} ({order.userId.email})
            </h3>
            <p className="text-sm text-gray-500">
              Order ID: <span className="font-mono">{order._id}</span>
            </p>
            <p className="text-sm text-gray-500">
              Payment Method: {order.paymentMethod} | Payment Status:{" "}
              <span
                className={`font-semibold ${
                  order.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"
                }`}
              >
                {order.paymentStatus}
              </span>
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">🧾 Products Ordered:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl"
                >
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">{product.productName}</p>
                    <p className="text-sm text-gray-600">
                      ₹{product.price} x {product.quantity}
                    </p>
                    <p className="text-xs text-gray-400">{product.description.slice(0, 60)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm text-gray-600">
                📦 <span className="font-medium">Shipping Status:</span>{" "}
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                  {order.shippingStatus}
                </span>
              </p>
              {order.estimatedDelivery && (
                <p className="text-xs text-gray-500">
                  Estimated Delivery:
                {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              {["Pending", "Shipped", "Delivered"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateShipping(order._id, status)}
                  className={`px-3 py-1 rounded-xl text-sm font-medium border transition ${
                    order.shippingStatus === status
                      ? "bg-green-600 text-white"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
