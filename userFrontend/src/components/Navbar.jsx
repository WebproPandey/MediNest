import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/action/authActions";
import { searchProducts } from "../redux/action/userCategoryActions";
import { FaSearch, FaHeart, FaShoppingCart, FaPhoneAlt, FaBars } from "react-icons/fa";
import { TopBar } from "./TopBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim()) {
        dispatch(searchProducts(keyword));
      navigate(`/subcategory/search?keyword=${encodeURIComponent(keyword)}`);
       setKeyword("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();

  };

  return (
    <nav className="w-full text-sm font-medium sticky top-[-10%] z-[99]  shadow-lg ">
      {/* Top bar */}
      <div className="bg-gray-100 text-gray-600 py-2 px-6 flex justify-end space-x-4">
        <TopBar/>
      </div>

      {/* Main navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-black">
          Medinest
        </Link>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-2xl mx-6">
          <select className="border rounded-l px-3 py-2 text-gray-600 bg-gray-100">
            <option>All Categories</option>
          </select>
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border-t border-b px-3 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 px-4 py-2 rounded-r text-white hover:bg-red-600"
        >
          <FaSearch />
        </button>
        </div>

        {/* Icons and Auth */}
        <div className="flex items-center space-x-6 text-gray-700">
          {user ? (
            <>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold uppercase">
             {user?.name?.charAt(0)}
            </span>
              <button
                onClick={() => dispatch(logoutUser())}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          )}
          <Link to="/watchlist">
           <FaHeart className="text-xl cursor-pointer" />
          </Link>
            <Link to={`/add-product/:categoryId`} className="relative p-2 ">
            <div className="flex items-center  relative ">
             <FaShoppingCart className="text-xl" />
              <div className="text-white  absolute right-0 top-0  bg-red-500 px-1 leading-none   text-sm rounded-full ">1</div>
            </div>
             </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2 text-white bg-red-500 px-4 py-2 rounded cursor-pointer">
          <FaBars />
          <span>All Categories</span>
        </div>

        <div className="flex items-center space-x-6 text-gray-700">
          <Link to="/">HOME</Link>
          <Link to="#">LAYOUTS</Link>
          <Link to="#">FEATURES</Link>
          <Link to="#">SHOP</Link>
          <Link to="#">PAGES</Link>
          <Link to="#">BLOG</Link>
        </div>

        <div className="flex items-center space-x-2 text-red-500 font-semibold">
          <FaPhoneAlt />
          <span>+111 - 222 - 333</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
