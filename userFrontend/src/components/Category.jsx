import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCategories } from "../redux/action/userCategoryActions";
import { useNavigate } from "react-router-dom";


const SkeletonCard = () => {
  return (
    <div className="border p-1 flex items-center  justify-center md:p-3 rounded-full md:rounded shadow animate-pulse">
      <div className="md:h-[20vh] md:w-full h-8 w-8 bg-gray-300 rounded-full md:rounded md:mb-2"></div>
      <div className="h-4 hidden bg-gray-300 rounded w-2/3 mx-auto"></div>
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
    <div className="py-2 md:py-6 md:px-4">
      <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>

      {loading ? (
        <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories?.slice(0, 6).map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className="border p-1 md:p-3 rounded-full flex items-center  justify-center  md:rounded shadow hover:shadow-md transition cursor-pointer"
            >
              <div className="md:h-[20vh] w-full">
                <img
                  src={cat.image}
                  alt={cat.categoryName}
                  loading="lazy"
                  className="w-full h-full object-cover rounded md:mb-2"
                />
              </div>
              <h3 className="hidden text-center font-medium">{cat.categoryName}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
