import React from 'react'
import { Link, Outlet } from 'react-router-dom'



const Dashboard = () => {
 
  return (
     <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="space-y-2">
          <Link to="allProduct" className="block hover:text-yellow-400">All Product</Link>
          <Link to="/dashboard/categories" className="block p-2 hover:bg-gray-200">Categories</Link>
          <Link to="/dashboard/subcategories" className="block p-2 hover:bg-gray-200">Subcategories</Link>
      
          {/* Add more links as needed */}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard