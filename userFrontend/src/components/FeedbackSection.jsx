import React from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Amit Sharma",
    feedback: "Medinest made my medicine delivery easy and fast. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    feedback: "Good prices, timely service. I found all my essentials in one place.",
    rating: 4,
  },
  {
    name: "Rahul Verma",
    feedback: "Very smooth checkout and friendly support. Will order again!",
    rating: 5,
  },
  {
    name: "Sunita Rao",
    feedback: "Excellent experience. My go-to pharmacy now.",
    rating: 5,
  },
  {
    name: "Nikhil Jain",
    feedback: "Great discounts and fast delivery. Highly satisfied.",
    rating: 4,
  },
];

const FeedbackSection = () => {
  return (
    <section className="FeedbackSection w-full bg-gray-100 py-6 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl md:text-4xl font-bold text-gray-800 mb-10">
          What Our Customers Say
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
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
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition h-full flex flex-col justify-between">
                <div className="text-yellow-500 flex justify-center mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 line-clamp-2">
                  "{item.feedback}"
                </p>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedbackSection;
