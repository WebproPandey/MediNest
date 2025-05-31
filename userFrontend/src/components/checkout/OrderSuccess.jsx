import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 bg-[#f9f9f9]">
      <div className="bg-green-100 text-green-700 p-6 rounded-full text-4xl mb-4">
        ✅
      </div>
      <h2 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order is being processed and will be shipped soon.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
