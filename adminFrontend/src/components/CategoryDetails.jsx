import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSubcategories } from "../redux/action/subcategoryActions";

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const { id: categoryId } = useParams(); // from route /admin/categories/:id

  const { subcategories, loading, error } = useSelector((state) => state.subcategories);
  console.log("subcategories:" ,subcategories)

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubcategories(categoryId));
    }
  }, [categoryId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Subcategory Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : subcategories.length === 0 ? (
        <p>No subcategory products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subcategories.map((sub) => (
            <div key={sub._id} className="border p-4 rounded-lg shadow">
              <img
                src={sub.image}
                alt={sub.productName}
                className="h-32 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold">{sub.productName}</h3>
              <p>{sub.description}</p>
              <p>Stock: {sub.stock}</p>
              <p className="font-bold">Price: ₹{sub.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
