import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAddresses } from "../../redux/action/addresActions";
import { useNavigate } from "react-router-dom";

const AddressStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, loading } = useSelector((state) => state.addresses);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    house: "",
  });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedAddressId) {
      // User selected existing address — no need to create new one
      navigate("/checkout/confirm");
    } else {
      // Validate before creating
      const isEmpty = Object.values(newAddress).some((val) => val.trim() === "");
      if (isEmpty) {
        alert("Please fill all fields or select an existing address.");
        return;
      }

      await dispatch(addAddress(newAddress));
      await dispatch(fetchAddresses());
      navigate("/checkout/confirm");
    }
  };

  return (
    <div className="space-y-4 md:px-6 px-4">
      <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>

      {loading ? (
        <p>Loading addresses...</p>
      ) : addresses.length > 0 ? (
        <div className="space-y-2">
          <h4 className="font-semibold">Select an Address</h4>
          <div className=" grid grid-cols-1 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="flex items-start gap-2 border p-2 rounded"
            >
              <input
                type="radio"
                name="selectedAddress"
                value={address._id}
                onChange={() => setSelectedAddressId(address._id)}
                checked={selectedAddressId === address._id}
                className="mt-1"
              />
              <div className="grid md:grid-cols-1 grid-cols-2 gap-3">
                <p><strong>Name:</strong> {address.fullName}</p>
                <p><strong>Phone:</strong> {address.phone}</p>
                <p><strong>Pin Code:</strong> {address.pinCode}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>State:</strong> {address.state}</p>
                <p><strong>Country:</strong> {address.country}</p>
                {address.isDefault && (
                  <p className="text-green-600 font-semibold">Default Address</p>
                )}
              </div>
            </div>
          ))}
          </div>

        </div>
      ) : (
        <p>No addresses found. Please add a new address.</p>
      )}

      {/* Add new address form */}
      <div>
      <h4 className="font-semibold text-base">Add a New Address</h4>
      <form onSubmit={handleSubmit} className=" grid md:grid-cols-3 grid-cols-2  w-full gap-3">

        {/* Form fields */}
        {["fullName", "phone", "pinCode", "house", "city", "state", "country"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            className="w-full h-full border px-2 py-2 md:py-3 rounded"
            value={newAddress[field]}
            onChange={handleChange}
            disabled={!!selectedAddressId} // Disable form if existing selected
            required={!selectedAddressId}
          />
        ))}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="bg-gray-300 text-gray-700 px-4 py-2  text-[2vw] md:text-base rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-[2vw] md:text-base"
          >
            Continue to Payment
          </button>
        </div>
      </form>
      </div>

    </div>
  );
};

export default AddressStep;
