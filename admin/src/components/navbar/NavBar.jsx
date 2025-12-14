
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { assets } from "../../assets/assets";

const NavBar = () => {
  const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = import.meta.env.VITE_FRONTEND_URL;
    }
  return (
    <div className="flex justify-between  items-center px-4 py-2 bg-white border-b border-gray-300">
      <div className="flex flex-col">
        <img src={assets.logo} alt="Logo" className="w-23 -mt-5 " />
        <span className="text-sm -mt-8 text-[20px] text-black font-medium ml-2">Admin <span className="text-orange-500">Panel</span></span>
      </div>
    <button onClick={handleLogout} className="bg-orange-500 text-white px-4 py-2 rounded mr-3">
      Sign Out
    </button>
    </div>
  );
};

export default NavBar;

