import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import SubCategoryProduct from "./pages/SubCategoryProduct";
import AddProductSection from "./pages/AddProductSection";
import {Watchlist} from "./components/Watchlist";
import AddressStep from "./components/checkout/AddressStep";
// import PaymentStep from "./components/checkout/PaymentStep";
import ConfirmOrder from "./components/checkout/ConfirmOrder";
import OrderSuccess from "./components/checkout/OrderSuccess";
import CheckoutFlow from "./components/checkout/CheckoutFlow";


const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subcategory/:categoryId" element={<SubCategoryProduct/>} />
        <Route path="/subcategory/search" element={<SubCategoryProduct/>}/>
        <Route path="/add-product/:categoryId" element={<AddProductSection/>} />
        <Route path="/watchlist" element={<Watchlist/>} />
        <Route path="/checkout" element={<CheckoutFlow/>} />
        <Route path="/checkout/address" element={<AddressStep/>} />
        {/* <Route path="/checkout/payment" element={<PaymentStep />} /> */}
        <Route path="/checkout/confirm" element={<ConfirmOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />

      </Routes>
      <Footer/>
    </>
  );
};

export default App;
