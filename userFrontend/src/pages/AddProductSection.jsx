import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductsByCategory } from "../redux/action/userCategoryActions";
import {
  addToCart,
  setSelectedProduct,
  addToWatchlist,
  removeFromWatchlist,
} from "../redux/action/userCartActions";
import { createOrder, verifyPayment } from "../redux/action/paymentAction";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AddProductSection = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = useSelector(
    (state) => state.userCart.selectedProduct
  );
  const watchlist = useSelector((state) => state.userWatchlist.watchlist);
 

  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productsByCategory
  );

  useEffect(() => {
    if (categoryId && categoryId !== "undefined") {
      dispatch(fetchProductsByCategory(categoryId));
    }
    window.scrollTo(0, 0);
  }, [dispatch, categoryId]);

  const handleBuyNow = async () => {
    const orderData = {
      productId: selectedProduct._id,
      quantity,
      totalAmount: selectedProduct.price * quantity,
    };

    const orderResponse = await dispatch(createOrder(orderData));
    if (orderResponse?.razorpayOrder) {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.razorpayOrder.amount,
        currency: orderResponse.razorpayOrder.currency,
        name: "MediNest",
        description: "Test Transaction",
        order_id: orderResponse.razorpayOrder.id,
        handler: async (response) => {
          const paymentData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
          };
          await dispatch(verifyPayment(paymentData));
          alert("Payment Successful!");
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: user?.phone || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen p-4">
      {/* Product Image Section */}
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

          {/* Product Info */}
          <div className="max-w-xl w-full space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">
                {selectedProduct?.productName}
              </h2>
              <FaHeart
                className={`cursor-pointer text-xl transition ${
                  watchlist.find((item) => item._id === selectedProduct._id)
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  const isInWatchlist = watchlist.find(
                    (item) => item._id === selectedProduct._id
                  );
                  if (isInWatchlist) {
                    dispatch(removeFromWatchlist(selectedProduct._id));
                  } else {
                    dispatch(addToWatchlist(selectedProduct));
                  }
                }}
              />
            </div>

            <div className="text-xl font-bold text-green-600">
              ₹{selectedProduct?.price}
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <div className="flex gap-4 mt-4">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg">
                Added To Cart
              </button>
              <button
                  onClick={() => navigate("/checkout")}
                // onClick={handleBuyNow}
                className="px-6 py-2 bg-orange-100 text-orange-500 rounded-lg"
              >
                checkout
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
            centeredSlides={false}
            pagination={false}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {products.map((item) => (
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
                    Add to Cart
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
