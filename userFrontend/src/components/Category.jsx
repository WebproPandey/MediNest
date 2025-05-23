import React from 'react';
import { FaStar, FaTablets, FaSyringe, FaSpa, FaVials, FaBaby, FaBriefcaseMedical } from 'react-icons/fa';

const categories = [
  { id: 1, name: "Medicines", icon: <FaTablets size={40} />, bg: "bg-blue-100" },
  { id: 2, name: "Health Tools", icon: <FaSyringe size={40} />, bg: "bg-yellow-100" },
  { id: 3, name: "Skin Care", icon: <FaSpa size={40} />, bg: "bg-pink-100" },
  { id: 4, name: "Vitamins", icon: <FaVials size={40} />, bg: "bg-green-100" },
  { id: 5, name: "Baby Care", icon: <FaBaby size={40} />, bg: "bg-purple-100" },
  { id: 6, name: "First Aid", icon: <FaBriefcaseMedical size={40} />, bg: "bg-red-100" },
];

const Category = () => {
  return (
    <div className="w-full py-6 px-4 bg-gray-100 rounded-md">
      <div className="text-black font-bold text-2xl flex items-center gap-2 mb-6">
        <FaStar className="text-yellow-500" /> Featured Categories
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer ${cat.bg}`}
          >
            <div className="mb-2 text-primary">{cat.icon}</div>
            <p className="text-sm font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
