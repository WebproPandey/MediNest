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
import ConfirmOrder from "./components/checkout/ConfirmOrder";
import OrderSuccess from "./components/checkout/OrderSuccess";
import CheckoutFlow from "./components/checkout/CheckoutFlow";
import UserOrders from "./pages/UserOrders";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/action/authActions";


const App = () => {
   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
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
        <Route path="/checkout/confirm" element={<ConfirmOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<UserOrders/>} /> 
      </Routes>
      <Footer/>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
