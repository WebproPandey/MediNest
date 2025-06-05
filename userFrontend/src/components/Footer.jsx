import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 px-2 md:py-10  mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Logo & About */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-green-500 mb-2">Medinest</h1>
          <p className="text-sm text-gray-400">
            Your trusted medical partner. Providing health essentials and reliable delivery at your fingertips.
          </p>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-3  md:gap-2 w-full ">

        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Products</a></li>
            <li><a href="#" className="hover:text-white">Plans</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Delivery Info</a></li>
            <li><a href="#" className="hover:text-white">Return Policy</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-[2.5vw] md:text-sm text-gray-400">Email: support@medinest.in</p>
          <p className="text-[2.5vw] md:text-sm text-gray-400">Phone: +91 98765 43210</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-sm md:text-xl hover:text-white"><FaFacebookF /></a>
            <a href="#" className="text-sm md:text-xl hover:text-white"><FaTwitter /></a>
            <a href="#" className="text-sm md:text-xl hover:text-white"><FaInstagram /></a>
            <a href="#" className="text-sm md:text-xl hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="text-center mt-5 md:mt-10 border-t border-gray-700 pt-4 text-[3vw] md:text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Medinest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
