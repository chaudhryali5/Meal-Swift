import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { assets } from '../../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white py-6 px-4 sm:px-6 md:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex justify-center items-center">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">

          {/* Logo Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                <img
                  src={assets.logo}
                  alt="MealSwift Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-bold"><span className='text-orange-600'>Meal</span>Swift</h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              MealSwift delivers delicious meals right to your doorstep. Fast, fresh and from the best local restaurants.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 border border-gray-500 rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                className="w-9 h-9 border border-gray-500 rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition"
              >
                <FaTwitter size={14} />
              </a>

              <a
                href="#"
                className="w-9 h-9 border border-gray-500 rounded-full flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold text-orange-600 lg:ml-20 mb-3">COMPANY</h3>
            <ul className="space-y-2 lg:ml-20">
              <li onClick={() => navigate('/')} className="text-gray-300 text-sm hover:text-orange-500 transition cursor-pointer" >Home</li>
              <li onClick={() => navigate('/about')} className="text-gray-300 text-sm hover:text-orange-500 transition cursor-pointer"> About us</li>
              <li onClick={() => navigate('/contact-us')} className="text-gray-300 text-sm hover:text-orange-500 transition cursor-pointer"> Contact us</li>
              <li onClick={() => navigate('/privacy-policy')} className="text-gray-300 text-sm hover:text-orange-500 transition cursor-pointer"> Privacy policy</li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-orange-600 mb-3">GET IN TOUCH</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>+1-212-456-7890</li>
              <li className="break-all">contact@mealswift.com</li>
            </ul>
          </div>

        </div>

        {/* Divider */}

      </div>
      <div className="border-t border-gray-700 my-5"></div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-xs">
        © 2025 MealSwift.com — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
