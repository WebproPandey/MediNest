import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCategories } from "../redux/action/userCategoryActions";

const Category = () => {
  const dispatch = useDispatch();

  const { loading, categories, error } = useSelector(
    (state) => state.userCategories
  );
  console.log("categories:" ,categories)

  useEffect(() => {
    dispatch(fetchUserCategories());
  }, [dispatch]);

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories?.map((cat) => (
            <div key={cat._id} className="border p-3 rounded shadow hover:shadow-md transition">
              <div>

              <img
                src={cat.image}
                alt={cat.categoryName}
                className="w-full h-32 object-cover rounded mb-2"
                />
                </div>
              <h3 className="text-center font-medium">{cat.categoryName}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;







