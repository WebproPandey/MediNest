import React, { useEffect, useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import doctorImage from "../assets/Banner/drImage-removebg.png";
import ConsultationForm from "./ConsultationForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCategories,
  fetchProductsByCategory,
} from "../redux/action/userCategoryActions";
import {
  addToCart,
  addToWatchlist,
  removeFromWatchlist,
  setSelectedProduct,
} from "../redux/action/userCartActions";
import { useNavigate } from "react-router-dom";

const LatestedProduct = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate()
  const { categories, loading: catLoading } = useSelector(
    (state) => state.userCategories
  );
  const { loading, products, error } = useSelector(
    (state) => state.productsByCategory
  );
  const watchlist = useSelector((state) => state.userWatchlist.watchlist);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchUserCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const lastTwo = categories.slice(-2);
      const categoryId = lastTwo[activeCategoryIndex]?._id;
      if (categoryId) {
        dispatch(fetchProductsByCategory(categoryId));
      }
    }
  }, [categories, activeCategoryIndex, dispatch]);

  const lastTwoCategories = categories?.slice(-2) || [];

  const handleWatchlistToggle = (product) => {
    const isInWatchlist = watchlist.find((item) => item._id === product._id);
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(product._id));
    } else {
      dispatch(addToWatchlist(product));
    }
  };

const handleAddToCart = (product) => {
  dispatch(setSelectedProduct(product));
  navigate(`/add-product/${product.category}`);
  window.scrollTo(0, 0);
};

  return (
    <div className="w-full min-h-screen px-10">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between py-4 px-2 bg-gray-200 rounded-md">
        <div className="text-black font-bold text-2xl flex items-center gap-2">
          <FaStar className="text-yellow-500" /> Our Latest Products
        </div>
        <div className="relative flex items-end justify-end gap-6 px-4">
          {catLoading ? (
            <span>Loading...</span>
          ) : (
            lastTwoCategories.map((cat, idx) => (
              <div
                key={cat._id}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`cursor-pointer text-2xl text-black font-medium relative 
                  after:absolute after:left-0 after:-bottom-2 
                  after:h-[2px] after:bg-gray-400 
                  after:transition-all after:duration-500
                  ${activeCategoryIndex === idx ? "after:w-full" : "after:w-0"}`}
              >
                {cat.categoryName}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full py-10 min-h-screen flex items-center justify-center gap-2">
        {/* Doctor Card */}
        <div className="w-[30%] h-screen bg-gray-200 shadow-md p-4 flex flex-col items-center justify-start relative">
          <img
            src={doctorImage}
            alt="Doctor"
            className="w-full h-auto object-contain mb-4"
          />
          <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
            Talk to a Doctor
          </h3>
          <p className="text-gray-600 text-center mb-4">
            Need medical help? Connect with a certified doctor now.
          </p>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Start Consultation
            </button>
          ) : (
            <ConsultationForm onClose={() => setShowForm(false)} />
          )}
        </div>

        {/* Products */}
        <div className="w-[70%] h-screen grid grid-cols-3 gap-4 overflow-y-auto pr-2">
          {loading ? (
            <div className="col-span-3 text-center text-lg">
              Loading products...
            </div>
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="h-40 w-full bg-white rounded-md mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.productName}
                </h3>

                <div className="flex justify-between items-center mb-2">
                  <FaHeart
                    className={`text-xl cursor-pointer transition-colors ${
                      watchlist.find((item) => item._id === product._id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleWatchlistToggle(product)}
                  />
                </div>

                {/* Stock info */}
                <div className="text-sm mb-2">
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

                <p className="text-green-600 font-bold mb-2">
                  ₹{product.price}
                </p>

                <button
                  className={`mt-auto py-2 text-sm font-medium rounded-lg ${
                    product.stock > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestedProduct;
