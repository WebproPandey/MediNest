import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../App.css';
import { Pagination, Navigation } from 'swiper/modules';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Vitamin C Tablets',
    price: '₹299',
    image: 'https://via.placeholder.com/150?text=Vitamin+C',
  },
  {
    id: 2,
    name: 'Omega-3 Fish Oil',
    price: '₹599',
    image: 'https://via.placeholder.com/150?text=Omega-3',
  },
  {
    id: 3,
    name: 'Multivitamin Capsules',
    price: '₹799',
    image: 'https://via.placeholder.com/150?text=Multivitamin',
  },
  {
    id: 4,
    name: 'Calcium + D3',
    price: '₹499',
    image: 'https://via.placeholder.com/150?text=Calcium+D3',
  },
];

export default function ProductSwiper() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{ type: 'fraction' }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className='bg-white rounded-xl shadow p-4 flex flex-col items-center'>
              <div className='h-[200px] w-[200px] bg-gray-100 rounded-md mb-4'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <h2 className='text-lg font-semibold text-gray-800 mb-1'>{product.name}</h2>
              <p className='text-green-600 font-bold mb-2'>{product.price}</p>
              <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
