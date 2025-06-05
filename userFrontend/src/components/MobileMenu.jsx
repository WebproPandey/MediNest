// components/MobileMenu.jsx
import { FaTimes } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

const MobileMenu = ({ isOpen, toggleMenu, user, logoutHandler }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-fit w-[50vw]  bg-white z-[100] shadow-lg transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} block md:hidden`}
    >
      <div className="p-6 flex flex-col gap-6 text-lg relative  h-full">

        {/* Close icon */}
        <div
          className="absolute right-4 top-4 text-2xl text-black cursor-pointer"
          onClick={toggleMenu}
        >
          <FaTimes />
        </div>

        {/* Navigation Links */}
        {[
          { path: "/", label: "HOME" },
          { path: "/features", label: "FEATURES" },
          { path: "/shop", label: "SHOP" },
          { path: "/my-orders", label: "MyOrder" },
        ].map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={toggleMenu}
            className="hover:text-red-600"
          >
            {label}
          </NavLink>
        ))}

        {/* Auth Section */}
        {user ? (
          <>
            <span className="text-blue-600 font-bold uppercase">{user?.name}</span>
            <button
              onClick={() => {
                logoutHandler();
                toggleMenu();
              }}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            onClick={toggleMenu}
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
