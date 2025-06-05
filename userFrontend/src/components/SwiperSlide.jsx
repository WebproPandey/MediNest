import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay} from 'swiper/modules';

export default function SwiperSlideBanner({ data }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay]}
        className="mySwiper"
      >
          {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div className={`w-full h-full text-white md:p-4  p-2 flex items-center justify-center flex-col ${item.bgColor}`}>
            <img src={item.image} alt={item.heading} loading="lazy" className="md:w-3/4 md:h-40 h-full  w-full object-cover rounded-lg" />
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}
