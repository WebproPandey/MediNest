import React, { useState } from "react";

const AddressStep = ({ onNext, onBack }) => {
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("checkoutAddress", JSON.stringify(address));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="w-full border p-2 rounded"
        value={address.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        className="w-full border p-2 rounded"
        value={address.mobile}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        className="w-full border p-2 rounded"
        value={address.pincode}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        className="w-full border p-2 rounded"
        value={address.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        className="w-full border p-2 rounded"
        value={address.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="house"
        placeholder="Flat, House no., Building"
        className="w-full border p-2 rounded"
        value={address.house}
        onChange={handleChange}
        required
      />

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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default AddressStep;
