import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import doctorImage from "../assets/Banner/drImage-removebg.png";
import ConsultationForm from "./ConsultationForm";

const LatestedProduct = () => {
  const [activeIndex, setActiveIndex] = useState(0); // default to first tab

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const productTabs = ["Product1", "Product2", "Product3"];

  // Dummy product data for each tab (6 per tab)
  const allProducts = [
    [
      {
        id: 1,
        name: "Thermometer",
        price: "₹299",
        image: "https://via.placeholder.com/150?text=Thermometer",
      },
      {
        id: 2,
        name: "Oximeter",
        price: "₹799",
        image: "https://via.placeholder.com/150?text=Oximeter",
      },
      {
        id: 3,
        name: "BP Monitor",
        price: "₹1499",
        image: "https://via.placeholder.com/150?text=BP+Monitor",
      },
      {
        id: 4,
        name: "Stethoscope",
        price: "₹499",
        image: "https://via.placeholder.com/150?text=Stethoscope",
      },
      {
        id: 5,
        name: "Glucose Meter",
        price: "₹999",
        image: "https://via.placeholder.com/150?text=Glucose+Meter",
      },
      {
        id: 6,
        name: "Nebulizer",
        price: "₹1299",
        image: "https://via.placeholder.com/150?text=Nebulizer",
      },
    ],
    [
      {
        id: 7,
        name: "Vitamin C",
        price: "₹199",
        image: "https://via.placeholder.com/150?text=Vitamin+C",
      },
      {
        id: 8,
        name: "Calcium",
        price: "₹249",
        image: "https://via.placeholder.com/150?text=Calcium",
      },
      {
        id: 9,
        name: "Iron",
        price: "₹179",
        image: "https://via.placeholder.com/150?text=Iron",
      },
      {
        id: 10,
        name: "Magnesium",
        price: "₹299",
        image: "https://via.placeholder.com/150?text=Magnesium",
      },
      {
        id: 11,
        name: "Zinc",
        price: "₹159",
        image: "https://via.placeholder.com/150?text=Zinc",
      },
      {
        id: 12,
        name: "Multivitamins",
        price: "₹399",
        image: "https://via.placeholder.com/150?text=Multivitamin",
      },
    ],
    [
      {
        id: 13,
        name: "Face Wash",
        price: "₹149",
        image: "https://via.placeholder.com/150?text=Face+Wash",
      },
      {
        id: 14,
        name: "Sunscreen",
        price: "₹299",
        image: "https://via.placeholder.com/150?text=Sunscreen",
      },
      {
        id: 15,
        name: "Moisturizer",
        price: "₹249",
        image: "https://via.placeholder.com/150?text=Moisturizer",
      },
      {
        id: 16,
        name: "Night Cream",
        price: "₹349",
        image: "https://via.placeholder.com/150?text=Night+Cream",
      },
      {
        id: 17,
        name: "Lip Balm",
        price: "₹99",
        image: "https://via.placeholder.com/150?text=Lip+Balm",
      },
      {
        id: 18,
        name: "Serum",
        price: "₹499",
        image: "https://via.placeholder.com/150?text=Serum",
      },
    ],
  ];

  const currentProducts = allProducts[activeIndex];
   const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full min-h-screen px-10">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between py-4 px-2 bg-gray-200 rounded-md">
        <div className="text-black font-bold text-2xl flex items-center gap-2">
          <FaStar className="text-yellow-500" /> Our Latest Products
        </div>

        <div className="relative flex items-end justify-end gap-6 px-4">
          {productTabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`cursor-pointer text-2xl text-black font-medium relative 
                after:absolute after:left-0 after:-bottom-2 
                after:h-[2px] after:bg-gray-400 
                after:transition-all after:duration-500
                ${activeIndex === index ? "after:w-full" : "after:w-0"}`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Product Cards */}
      <div className="w-full py-10 min-h-screen flex items-center  justify-center gap-2">
        <div className="w-[30%] h-screen bg-gray-200 shadow-md p-4 flex flex-col items-center justify-start relative">
          {/* Doctor Image */}
          <img
            src={doctorImage}
            alt="Doctor"
            className="w-full h-auto object-contain mb-4"
          />

          {/* Short Description */}
          <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
            Talk to a Doctor
          </h3>
          <p className="text-gray-600 text-center mb-4">
            Need medical help? Connect with a certified doctor now.
          </p>

          {/* Button or Form */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Start Consultation
            </button>
          ) : (
            <ConsultationForm onClose={() => setShowForm(false)} />
          )}
        </div>
        <div className="w-[70%] h-screen grid grid-cols-3 gap-2 ">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-green-600 font-bold mb-3">{product.price}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestedProduct;
