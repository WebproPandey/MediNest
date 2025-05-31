import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  fetchProductsByCategory,
  searchProducts,
} from "../redux/action/userCategoryActions";
import { addToCart, addToWatchlist, removeFromWatchlist, setSelectedProduct } from "../redux/action/userCartActions";
import { FaHeart } from "react-icons/fa";

const SkeletonCard = () => (
  <div className="bg-white border rounded-2xl shadow p-4 animate-pulse flex flex-col gap-3">
    <div className="h-40 w-full bg-gray-300 rounded-xl mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
    <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
    <div className="h-3 bg-gray-300 rounded w-full"></div>
    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
    <div className="flex justify-between mt-auto">
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
      <div className="h-4 w-20 bg-gray-300 rounded"></div>
    </div>
    <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
  </div>
);

const SubCategoryProduct = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, products, error } = useSelector(
    (state) => state.productsByCategory
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword");
    if (keyword) {
      dispatch(searchProducts(keyword));
    }  else if (categoryId && categoryId !== "search" && categoryId !== "undefined") {
      dispatch(fetchProductsByCategory(categoryId));
    }

    window.scrollTo(0, 0);
  }, [dispatch, categoryId, location.search]);

  const watchlist = useSelector((state) => state.userWatchlist.watchlist);

  const handleWatchlistToggle = (product) => {
    const isInWatchlist = watchlist.find((item) => item._id === product._id);
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(product._id));
    } else {
      dispatch(addToWatchlist(product));
    }
  };

  return (
    <div className="min-h-screen w-full p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Subcategory Products
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-2xl shadow hover:shadow-lg transition-all gap-3 p-4 flex flex-col"
            >
              <div className="h-40 w-full overflow-hidden rounded-xl mb-3">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
                {product.productName}
              </h3>
              <FaHeart
                className={`text-xl cursor-pointer transition-colors ${
                  watchlist.find((item) => item._id === product._id)
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
                onClick={() => handleWatchlistToggle(product)}
              />

              <p className="text-sm text-gray-500 text-center mb-2">
                {product.subcategoryName}
              </p>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-green-600 font-bold">
                  ₹{product.price}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 0
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              <button
                className={`mt-auto py-2 text-sm font-medium rounded-lg ${
                  product.stock > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={product.stock === 0}
                onClick={() => {
                  dispatch(setSelectedProduct(product));
                  navigate(`/add-product/${categoryId}`);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategoryProduct;
