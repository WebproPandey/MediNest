import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/action/authActions";
import { searchProducts } from "../redux/action/userCategoryActions";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // console.log("user" ,user)

  const [keyword, setKeyword] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = () => {
    if (keyword.trim()) {
      dispatch(searchProducts(keyword));
      navigate(`/subcategory/search?keyword=${encodeURIComponent(keyword)}`);
      setKeyword("");
      setIsSearchOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="w-full text-sm font-medium sticky top-0 z-[99] shadow-lg bg-white">
        <div className="flex items-center justify-between px-6 py-4 shadow">
          <div className="w-[20%] flex items-center gap-2">
            {/* Hamburger for Mobile */}
            <button className="md:hidden text-xl" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Logo */}
            <Link to="/" className="text-xl md:text-3xl font-bold text-green-500">
              Medinest
            </Link>
          </div>

          {/* NavLinks for Desktop */}
          <div className="hidden md:flex items-center justify-center text-gray-700 w-fit gap-4">
            {[
              { path: "/", label: "HOME" },
              { path: "/features", label: "FEATURES" },
              { path: "/shop", label: "SHOP" },
              { path: "/my-orders", label: "MyOrder" },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-[1.2vw] font-semibold transition duration-200 ${
                    isActive ? "text-red-600 border-b-2 border-red-600" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center justify-end space-x-2 md:space-x-6 text-gray-700 w-[20%] relative">
            {/* Search Input */}
            <div className="flex items-center relative">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-sm md:text-xl text-black px-2 z-20">
                <FaSearch />
              </button>
              <div
                className={`absolute right-10 top-1/2 -translate-y-1/2 h-8 md:h-10 overflow-hidden border rounded-full flex items-center bg-white transition-all duration-300 ${
                  isSearchOpen ? "w-[28vw] md:w-[15vw] px-2 border-black" : "w-0 px-0 border-white"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full bg-transparent outline-none px-2 text-sm"
                />
                <button onClick={handleSearch} className="text-black text-sm px-1">
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex  items-center gap-2">
              {user ? (
                <>
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold uppercase">
                    {user?.data?.name?.charAt(0)}
                  </span>
                  <button onClick={() => dispatch(logoutUser(navigate))} className="bg-red-500 text-white px-2 py-1 rounded-md  hover:underline">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              )}
            </div>

            {/* Cart Icon */}
            <Link to="/watchlist" className="relative p-2">
              <div className="flex items-center relative">
                <FaShoppingCart className="text-xl" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        toggleMenu={closeMobileMenu}
        user={user}
        logoutHandler={() => dispatch(logoutUser(navigate))}
      />
    </>
  );
};

export default Navbar;
