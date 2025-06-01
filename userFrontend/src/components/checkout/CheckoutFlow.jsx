import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginStep from "../../pages/Login";
import AddressStep from "./AddressStep";
import ConfirmOrder from "./ConfirmOrder";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutFlow = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/checkout");
    } else if (location.pathname === "/checkout") {
      navigate("/checkout/address");
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {location.pathname === "/checkout" && <LoginStep />}
      {location.pathname === "/checkout/address" && <AddressStep />}
      {location.pathname === "/checkout/confirm" && <ConfirmOrder />}
    </div>
  );
};

export default CheckoutFlow;
