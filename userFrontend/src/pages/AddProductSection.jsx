import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../redux/action/userCategoryActions";
import { addToCart, setSelectedProduct } from "../redux/action/userCartActions";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AddProductSection = () => {
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = useSelector(
    (state) => state.userCart.selectedProduct
  );


  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productsByCategory
  );

  console.log("product:", products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryId));
  }, []);

  if (!selectedProduct) {
    return <div className="p-10 text-center">No product selected.</div>;
  }

  return (
    <div className="bg-[#f8f8f8] min-h-screen p-4">
      {/* Product Image Section */}
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
          <h2 className="text-2xl font-semibold">
            {selectedProduct?.productName}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="text-gray-600">(245 Reviews)</span>
          </div>
          <div className="text-xl font-bold text-green-600">
            ₹{selectedProduct?.price}
            <span className="text-gray-400 line-through ml-2">
              ₹{selectedProduct?.price + 20}
            </span>
          </div>
          <p className="text-gray-600">{selectedProduct?.description}</p>

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
            <button className="px-6 py-2 bg-orange-100 text-orange-500 rounded-lg">
              Buy Now
            </button>
          </div>

          <div className="text-sm text-gray-500 mt-2">
            {selectedProduct._id}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong>Skin Type:</strong> Normal, Oily, Dry, Combination,
            Sensitive skin
          </div>
          <div>
            <strong>Size/Volume:</strong> 30 ml, 60 ml, 80 ml, 100 ml
          </div>
          <div>
            <strong>Shelf Life:</strong> 24 months
          </div>
          <div>
            <strong>Application Time:</strong> Morning and Evening
          </div>
          <div>
            <strong>Packaging:</strong> Recyclable Glass Bottle
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">
          Explore Related Products
        </h3>
        <div className="">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={false}
            pagination={false}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {products
              ?.filter((item) => item._id !== selectedProduct._id)
              .map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col items-center h-[60vh]">
                    <div className="h-52 w-[150px] bg-gray-100 mb-4 rounded">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="object-contain w-full h-full rounded"
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
      </div>

      {/* Footer Info */}
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 mt-10 text-center text-sm text-gray-600">
        <div>
          <strong className="block text-lg text-black">Free Shipping</strong>
          Free shipping for order above $50
        </div>
        <div>
          <strong className="block text-lg text-black">Flexible Payment</strong>
          Multiple secure payment options
        </div>
        <div>
          <strong className="block text-lg text-black">24×7 Support</strong>
          We support orders all day.
        </div>
      </div>
    </div>
  );
};

export default AddProductSection;
