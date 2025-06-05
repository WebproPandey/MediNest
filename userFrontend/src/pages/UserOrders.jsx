import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders, cancelOrder } from "../redux/action/orderAction";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.userOrders);

  console.log("order:" ,orders)

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrder(orderId));
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-lg font-medium text-blue-500">
        Loading your orders...
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have not placed any orders yet.</p>
      ) : (
        orders?.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-2xl p-5 mb-6 border border-gray-200"
          >
            <div className="mb-4">
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
              <p className="text-sm text-gray-500">
                Total: <span className="text-black font-semibold">₹{order.totalAmount}</span>
              </p>
            </div>

            <h4 className="font-medium mb-2 text-gray-700">🧾 Products:</h4>
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
                    <p className="text-xs text-gray-400">
                      {product.description?.slice(0, 60)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                🚚 <span className="font-medium">Shipping Status:</span>{" "}
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                  {order.shippingStatus}
                </span>
              </p>
              {order.paymentStatus !== "Paid" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;