import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCategories } from "../redux/action/userCategoryActions";
import { useNavigate } from "react-router-dom";


const SkeletonCard = () => {
  return (
    <div className="border p-3 rounded shadow animate-pulse">
      <div className="h-[20vh] w-full bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
    </div>
  );
};

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, categories, error } = useSelector(
    (state) => state.userCategories
  );

  useEffect(() => {
    dispatch(fetchUserCategories());
  }, [dispatch]);

  const handleCategoryClick = (id) => {
  navigate(`/subcategory/${id}`);
};


  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories?.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className="border p-3 rounded shadow hover:shadow-md transition cursor-pointer"
            >
              <div className="h-[20vh] w-full">
                <img
                  src={cat.image}
                  alt={cat.categoryName}
                  loading="lazy"
                  className="w-full h-full object-cover rounded mb-2"
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
