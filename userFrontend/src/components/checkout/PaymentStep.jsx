import React, { useState } from "react";

const PaymentStep = ({ onNext, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("checkoutPayment", JSON.stringify({ method: paymentMethod }));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery (COD)
        </label>

        <label className="flex items-center gap-2 opacity-50">
          <input
            type="radio"
            name="paymentMethod"
            value="online"
            disabled
          />
          Online Payment (Coming Soon)
        </label>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Review Order
        </button>
      </div>
    </form>
  );
};

export default PaymentStep;
