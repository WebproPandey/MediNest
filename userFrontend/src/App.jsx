import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import SubCategoryProduct from "./pages/SubCategoryProduct";
import AddProductSection from "./pages/AddProductSection";


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
        <Route path="/add-product" element={<AddProductSection/>} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
