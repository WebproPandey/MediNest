import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../../redux/action/userCartActions";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = ({ onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.userCart.cart);
  const user = useSelector((state) => state.user.user);

  const address = JSON.parse(localStorage.getItem("checkoutAddress"));
  const payment = JSON.parse(localStorage.getItem("checkoutPayment"));

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrderHandler = () => {
    const orderData = {
      userId: user?._id,
      cartItems,
      address,
      paymentMethod: payment.method,
      totalAmount,
    };

    console.log("ORDER PLACED ✅", orderData);

    dispatch(clearCart()); // Empty the cart
    localStorage.removeItem("checkoutAddress");
    localStorage.removeItem("checkoutPayment");

    navigate("/order-success"); // redirect to order success page
  };

  if (!address || !payment || cartItems.length === 0) {
    return (
      <div className="text-red-500 font-semibold text-center p-4">
        Please complete all steps before confirming your order.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-2">Order Summary</h3>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Shipping Address</h4>
        <p>{address.fullName}</p>
        <p>{address.addressLine}</p>
        <p>{address.city}, {address.pincode}</p>
        <p>{address.country}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Payment Method</h4>
        <p>{payment.method === "cod" ? "Cash on Delivery" : payment.method}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Cart Items</h4>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>{item.productName} (x{item.quantity})</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold pt-2">
          <span>Total:</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={placeOrderHandler}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
