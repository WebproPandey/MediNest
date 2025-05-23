import React from "react";
import { FaLine, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Sample product data
const products = [
  {
    id: 1,
    name: "Digital Thermometer",
    price: "₹299",
    image: "https://via.placeholder.com/150?text=Thermometer",
  },
  {
    id: 2,
    name: "Pulse Oximeter",
    price: "₹799",
    image: "https://via.placeholder.com/150?text=Oximeter",
  },
  {
    id: 3,
    name: "Blood Pressure Monitor",
    price: "₹1499",
    image: "https://via.placeholder.com/150?text=BP+Monitor",
  },
  {
    id: 4,
    name: "Digital Thermometer",
    price: "₹299",
    image: "https://via.placeholder.com/150?text=Thermometer",
  },
  {
    id: 5,
    name: "Pulse Oximeter",
    price: "₹799",
    image: "https://via.placeholder.com/150?text=Oximeter",
  },
  {
    id: 6,
    name: "Blood Pressure Monitor",
    price: "₹1499",
    image: "https://via.placeholder.com/150?text=BP+Monitor",
  },
];

const ShowProduct = () => {
  return (
    <div className="ShowProduct w-full h-full px-8 py-6">
      <div className="w-full h-full bg-gray-100 px-4 py-6 rounded-xl shadow">
        <div className="text-black font-bold text-2xl flex items-end gap-2 mb-6 ">
          <div className="w-[0.3vw] h-7 bg-red-500 mx-2" />Today's Hot Deals <p className="text-sm text-end" >Hot Voucher Deal up to 50%++</p>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          centeredSlides={true}
          pagination={false}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} >
              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center h-[60vh] ">
                <div className=" h-full w-[200px] bg-gray-100 rounded-md mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h2>
                <p className="text-green-600 font-bold mb-2">
                  {product.price}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ShowProduct;
