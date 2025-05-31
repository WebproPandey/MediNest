import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginStep from "../../pages/Login";

const CheckoutFlow = () => {
  const user = useSelector((state) => state.user.user);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!user) {
      setStep(1);
    }
  }, [user]);

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => prev - 1);

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {step === 1 && <LoginStep onNext={goNext} />}
      {step === 2 && <AddressStep onNext={goNext} onBack={goBack} />}
      {step === 3 && <PaymentStep onNext={goNext} onBack={goBack} />}
      {step === 4 && <ConfirmStep />}
    </div>
  );
};

export default CheckoutFlow;
