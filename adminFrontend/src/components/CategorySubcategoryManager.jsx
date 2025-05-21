import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubcategories } from "../redux/action/subcategoryActions";

const CategorySubcategoryManager = () => {
  const dispatch = useDispatch();
  const { allproducts, loading, error } = useSelector(
    (state) => state.allSubcategories
  );
  console.log("allproducts:",allproducts)

  useEffect(() => {
    dispatch(fetchAllSubcategories());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        All Subcategory Products
      </h2>

      {loading ? (
        <p className="text-center text-blue-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : allproducts?.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allproducts?.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-xl shadow p-4 flex flex-col"
            >
              <img
                src={sub.image}
                alt={sub.productName}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">
                {sub.productName}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {sub.description.length > 60
                  ? sub.description.slice(0, 60) + "..."
                  : sub.description}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Subcategory:</strong> {sub.subcategoryName}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Category:</strong> {sub.category?.categoryName}
              </p>
              <div className="mt-auto">
                <p className="text-green-700 font-semibold mb-1">
                  ₹{sub.price} &nbsp; | &nbsp; Stock: {sub.stock}
                </p>
                <button className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySubcategoryManager;
