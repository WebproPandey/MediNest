import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomProducts } from "../redux/action/productActions";
import {
  addToCart,
  addToWatchlist,
  removeFromWatchlist,
  setSelectedProduct,
} from "../redux/action/userCartActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate, useParams } from "react-router-dom";

// ✅ SkeletonCard Component
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col items-center h-[60vh] animate-pulse">
      <div className="h-[40vh] w-[200px] bg-gray-300 rounded-md mb-4" />
      <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-4" />
      <div className="h-10 w-full bg-gray-300 rounded" />
    </div>
  );
};

const ShowProduct = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { loading, products, error } = useSelector(
    (state) => state.randomProducts
  );

  const watchlist = useSelector((state) => state.userWatchlist.watchlist);

  useEffect(() => {
    dispatch(fetchRandomProducts());
  }, [dispatch]);

  const handleWatchlistToggle = (product) => {
    const isInWatchlist = watchlist.find((item) => item._id === product._id);
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(product._id));
    } else {
      dispatch(addToWatchlist(product));
    }
  };

  return (
    <div className="ShowProduct w-full h-full px-2 md:px-8 py-6">
      <div className="w-full h-full bg-gray-100 md:px-4 py-6 rounded-xl shadow">
        <div className="text-black font-bold text-xl md:text-2xl flex items-end   gap-2 mb-6 ">
          <div className="w-[0.3vw] h-7 bg-red-500 mx-1 md:mx-2  " />
          Today's Hot Deals
          <p className="text-[2vw] md:text-sm text-end">
            Hot Voucher Deal up to 50%++
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={false}
            pagination={false}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {products?.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="bg-white rounded-md shadow p-3 flex flex-col items-center h-[55vh] md:h-[60vh] relative">
                  {/* ❤️ Watchlist Toggle Icon */}
                  <div className="absolute top-2 right-2">
                    <FaHeart
                      className={`cursor-pointer text-xl transition ${
                        watchlist.find((item) => item._id === product._id)
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleWatchlistToggle(product)}
                    />
                  </div>

                  {/* Product Image - Responsive */}
                  <div className="h-[25vh] w-[120px] md:h-[35vh] md:w-[200px] bg-gray-100 rounded-md mb-4">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>

                  {/* Product Info */}
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-1 text-center">
                    {product.productName}
                  </h2>
                  <p className="text-green-600 font-bold mb-2">
                    ₹{product.price}
                  </p>

                  {/* 🛒 Add to Cart */}
                  <button
                    className="bg-blue-600 text-white text-sm md:text-base px-3 md:px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => {
                      dispatch(setSelectedProduct(product));
                      navigate(`/add-product/${product.category}`);
                    }}
                  >
                    View Cart
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
