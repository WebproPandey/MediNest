import React from "react";
import SwiperSlideBanner from "./SwiperSlide";
import Category from "./Category";



const BannerSection = () => {
const bannerData1 = [
  {
    id: 1,
    heading: "Discounted Medicines",
    image: "https://via.placeholder.com/400x200.png?text=Banner+1",
    bgColor: "bg-teal-600",
  },
  {
    id: 2,
    heading: "Health Essentials",
    image: "https://via.placeholder.com/400x200.png?text=Banner+1+Slide2",
    bgColor: "bg-orange-500",
  },
   {
    id: 3,
    heading: "Health Essentials",
    image: "https://via.placeholder.com/400x200.png?text=Banner+1+Slide2",
    bgColor: "bg-orange-200",
  },
];

const bannerData2 = [
  {
    id: 1,
    heading: "Top Vitamins",
    image: "https://via.placeholder.com/400x200.png?text=Banner+2",
    bgColor: "bg-green-500",
  },
   {
    id: 2,
    heading: "Top Vitamins",
    image: "https://via.placeholder.com/400x200.png?text=Banner+2",
    bgColor: "bg-green-300",
  },
   {
    id: 3,
    heading: "Top Vitamins",
    image: "https://via.placeholder.com/400x200.png?text=Banner+2",
    bgColor: "bg-green-100",
  },
];

const bannerData3 = [
  {
    id: 1,
    heading: "Skin Care",
    image: "https://via.placeholder.com/400x200.png?text=Banner+3",
    bgColor: "bg-purple-500",
  },
   {
    id: 2,
    heading: "Skin Care",
    image: "https://via.placeholder.com/400x200.png?text=Banner+3",
    bgColor: "bg-purple-300",
  },
   {
    id: 3,
    heading: "Skin Care",
    image: "https://via.placeholder.com/400x200.png?text=Banner+3",
    bgColor: "bg-purple-100",
  },
];


  return (
    <div className="w-full  min-h-screen ">
        <div className="swipersection h-[85vh] w-full  flex justify-center gap-2  items-center  py-10 ">
            <div className="leftside w-[60%] h-full bg-red-300">
                <SwiperSlideBanner data={bannerData1}/>
            </div>
            <div className="rightside w-[35%] h-full  flex flex-col  gap-2">
                <div className="toprightside h-[50%] w-full bg-green-300">
                    <SwiperSlideBanner data={bannerData2}/>
                </div>
                <div className="bottomrightside h-[50%] w-full bg-blue-300">
                    <SwiperSlideBanner data={bannerData3}/>
                </div>
            </div>
        </div>
        <div className="categorysection min-h-[30vh] w-full px-8 py-3">
          <Category/>
        </div>
     
    </div>
  );
};

export default BannerSection;
