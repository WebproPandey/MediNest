import React, { useEffect, useState } from "react";
import api from "../api/apiInstance";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get("/admin/orders");
      setOrders(data.data);
      console.log("data",data)
    };
    fetchOrders();
  }, []);

  const handleUpdateShipping = async (orderId, status, deliveryDate) => {
    await api.patch(`/admin/update-shipping/${orderId}`, {
      shippingStatus: status,
      estimatedDelivery: deliveryDate,
    });
    alert("Shipping status updated!");
  };

  return (
    <div>
      <h2>Admin Orders</h2>
      {orders?.map((order) => (
        <div key={order._id}>
          <p>User: {order.userId.name} ({order.userId.email})</p>
          <p>Products: {order.products.map((p) => p.productId).join(", ")}</p>
          <p>Shipping Status: {order.shippingStatus}</p>
          <button onClick={() => handleUpdateShipping(order._id, "Shipped", new Date())}>
            Mark as Shipped
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;