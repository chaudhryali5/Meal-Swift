
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { assets } from "../../assets/assets";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-300">
      <div className="flex flex-col">
        <img src={assets.logo} alt="Logo" className="w-23 -mt-5 " />
        <span className="text-sm -mt-8 text-[20px] text-black font-medium ml-2">Admin <span className="text-orange-500">Panel</span></span>
      </div>
      <FaUserCircle className="w-8 h-8 text-gray-600" />
    </div>
  );
};

export default NavBar;

