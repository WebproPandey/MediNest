import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductsByCategory } from "../redux/action/userCategoryActions";
import {
  addToCart,
  setSelectedProduct,
  addToWatchlist,
  removeFromWatchlist,
  removeFromCart,
} from "../redux/action/userCartActions";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AddProductSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const selectedProduct = useSelector(
    (state) => state.userCart.selectedProduct
  );
 console.log("selectedProduct",selectedProduct)

  const watchlist = useSelector((state) => state.userWatchlist.watchlist);

  const cart = useSelector((state) => state.userCart.cart);
  const { categoryId } = useParams();

  const { loading, products, error } = useSelector(
    (state) => state.productsByCategory
  );

  useEffect(() => {
    if (categoryId && categoryId !== "undefined") {
      dispatch(fetchProductsByCategory(categoryId));
    }
    window.scrollTo(0, 0);
  }, [dispatch, categoryId]);

 const handleAddToCart = () => {
  if (selectedProduct) {
    dispatch(addToCart({ ...selectedProduct, quantity })); // Pass updated quantity
  }
};

useEffect(() => {
  if (selectedProduct) {
    const existing = cart.find((item) => item._id === selectedProduct._id);
    if (existing) {
      setQuantity(existing.quantity); // Sync local quantity with Redux state
    } else {
      setQuantity(1);
    }
  }
}, [selectedProduct, cart]);
  const isInCart = cart.some((item) => item._id === selectedProduct?._id);

  return (
    <div className="bg-[#f8f8f8] min-h-screen p-4">
      {/* Product Detail */}
      {selectedProduct ? (
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl">
            <div className="relative overflow-hidden rounded-2xl h-[400px] w-full">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.productName}
                className="object-contain w-full h-full rounded-2xl"
              />
            </div>
          </div>

          <div className="max-w-xl w-full space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">
                {selectedProduct?.productName}
              </h2>
             
            
            </div>

            <div className="text-xl font-bold text-green-600">
              ₹{selectedProduct ? selectedProduct.price * quantity : 0}
            </div>

             <div className="text-sm text-gray-600 mb-1">
                    {selectedProduct.description}
                  </div>

       
            <div className="flex gap-4 mt-4">
  <button
    className={`px-6 py-2 rounded-lg transition ${
      watchlist.find((item) => item._id === selectedProduct._id)
        ? "bg-red-100 text-red-600 hover:bg-red-200"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
    onClick={() => {
      const inWatchlist = watchlist.find(
        (item) => item._id === selectedProduct._id
      );
      if (inWatchlist) {
        dispatch(removeFromWatchlist(selectedProduct._id));
      } else {
        dispatch(addToWatchlist(selectedProduct));
        navigate("/watchlist"); // Optional: navigate to watchlist
      }
    }}
  >
    {watchlist.find((item) => item._id === selectedProduct._id)
      ? "Remove from Watchlist"
      : "Add to Watchlist"}
  </button>
</div>

          </div>
        </div>
      ) : (
        <div className="text-center p-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            No product selected.
          </h2>
          <p className="text-gray-500">
            Please select a product to view its details.
          </p>
        </div>
      )}

      {/* Related Products */}
   {products && products.length > 0 && (
  <div>
    <h3 className="text-2xl font-semibold mb-6">
      Explore Related Products
    </h3>
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      pagination={false}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {products
        .filter((item) => item._id !== selectedProduct?._id)
        .map((item) => (
          <SwiperSlide key={item._id}>
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col items-center h-[60vh]">
              <div className="h-[30vh] w-[150px] bg-gray-100 mb-4 rounded">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <h4 className="font-medium mb-1 text-center">
                {item.productName}
              </h4>
              <div className="text-sm text-gray-600 mb-1">
                {item.subcategoryName}
              </div>
              <div className="text-lg font-bold text-green-600 mb-2">
                ₹{item.price}
              </div>
              <button
                className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
                onClick={() => {
                  dispatch(setSelectedProduct(item));
                }}
              >
                View Product
              </button>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  </div>
)}

    </div>
  );
};

export default AddProductSection;
