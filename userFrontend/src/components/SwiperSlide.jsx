import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
// import { Autoplay} from 'swiper/modules';

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
        navigation={true}
        // modules={[Autoplay]}
        className="mySwiper"
      >
          {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div className={`w-full h-full text-white p-4 flex items-center justify-center flex-col ${item.bgColor}`}>
            <h2 className="text-xl font-bold mb-2">{item.heading}</h2>
            <img src={item.image} alt={item.heading} className="w-3/4 h-40 object-cover rounded-lg" />
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}
