import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProfile, logoutAdmin } from "../redux/action/authActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAdminProfile()); // Fetch admin profile
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        {loading ? (
          <p>Loading...</p>
        ) : admin ? (
          <div className="mb-4">
            <p>Welcome, {admin.name}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </Link>
        )}
        <nav className="space-y-2">
          <Link to="allProduct" className="block hover:text-yellow-400">All Product</Link>
          <Link to="/dashboard/categories" className="block p-2 hover:bg-gray-200">Categories</Link>
          <Link to="/dashboard/orders" className="block p-2 hover:bg-gray-200">Manage Orders</Link>
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;