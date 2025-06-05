import React from "react";
import SwiperSlideBanner from "./SwiperSlide";
import Category from "./Category";
import '../App.css'
import suncreem1 from "../assets/Banner/suncreem1.jpg";
import suncreem2 from "../assets/Banner/suncreem2.jpg";
import suncreem3 from "../assets/Banner/suncreem3.jpg";
import secrum1 from "../assets/Banner/serum1.jpg";
import secrum2 from "../assets/Banner/serum2.jpg";
import secrum3 from "../assets/Banner/serum3.jpg";



const BannerSection = () => {

const bannerData1 = [
  {
    id: 1,
    image: suncreem1,
  },
  {
    id: 2,
    image: secrum1,
  },
   {
    id: 3,
    image: suncreem1,
  },
];

const bannerData2 = [
  {
    id: 1,
    image: suncreem2,
  },
   {
    id: 2,
    image: secrum2,
  },
   {
    id: 3,
    image: secrum2,
  },
];

const bannerData3 = [
  {
    id: 1,
    image: suncreem3,
  },
   {
    id: 2,
    image: secrum3,
  },
   {
    id: 3,
    image: suncreem3,
  },
];


  return (
    <div className="w-full  min-h-screen ">
        <div className="swipersection h-[80vh] w-full  flex md:flex-row flex-col justify-center md:gap-2  items-center  py-4 bg-gray-200 ">
            <div className="leftside w-full md:w-[60%] h-full ">
                <SwiperSlideBanner data={bannerData1}/>
            </div>
            <div className="rightside w-full md:w-[35%] h-full  flex flex-row md:flex-col ">
                <div className="toprightside md:h-[50%] md:w-full h-full w-1/2  ">
                    <SwiperSlideBanner data={bannerData2}/>
                </div>
                <div className="bottomrightside  md:h-[50%] md:w-full h-full w-1/2  ">
                    <SwiperSlideBanner data={bannerData3}/>
                </div>
            </div>
        </div>
        <div className="categorysection min-h-[30vh] w-full px-2 md:px-8 ">
          <Category/>
        </div>
     
    </div>
  );
};

export default BannerSection;
