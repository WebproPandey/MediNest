import React from "react";

export const TopBar = () => {
  return (
    <div className="bg-gray-100 text-sm text-gray-600 py-2 px-4 flex justify-between items-center  w-full">
      <span>Welcome to our MediNest store!</span>

      <div className="flex items-center space-x-4">
        <span>English</span>
        <span>|</span>
        <span>$ USD Dollar</span>
        <span className="ml-4">📞 +111 - 222 - 333</span>
      </div>
    </div>
  );
};
