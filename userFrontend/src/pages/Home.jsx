import React from "react";
import BannerSection from "../components/BannerSection";
import ShowProduct from "../components/ShowProduct";
import Banner from "../components/Banner";
import LatestedProduct from "../components/LatestedProduct";
import FeedbackSection from "../components/FeedbackSection";
import BannerSecond from "../components/BannerSecond";

export default function HomePage() {
  return (
    <div className="text-gray-800  min-h-screen ">
      <BannerSection/>
      <ShowProduct/>
      <Banner/>
      <LatestedProduct/>
      <BannerSecond/>
      <FeedbackSection/>
    </div>
  );
}
