import React, { useEffect, useState } from "react";
import api from "../api/api";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get("/buy-now/my-orders");
      setOrders(data.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Products: {order.products.map((p) => p.productId).join(", ")}</p>
          <p>Shipping Status: {order.shippingStatus}</p>
          <p>Estimated Delivery: {order.estimatedDelivery}</p>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;