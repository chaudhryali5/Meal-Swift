
import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaList, FaShoppingCart } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col w-16 md:w-60 border-r border-black">
      <div className="mt-10">
        {/* Add Items */}
        <div className="ml-5 mb-2 border-r-0">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center p-3 border-r-0 border transition-colors hover:bg-gray-50 ${isActive ? "border-orange-500 bg-orange-500/50" : "border-black border"
              }`
            }
          >
            <FaPlusCircle className="w-5 h-5" />
            <p className="ml-3 text-orange-500 hidden md:block">Add Items</p>
          </NavLink>
        </div>

        {/* List Items */}
        <div className="ml-5 mb-2 border-r-0">
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `flex items-center p-3 border border-r-0 transition-colors  hover:bg-gray-50 ${isActive ? "border-orange-500 bg-orange-500/50" : "border-black border"
              }`
            }
          >
            <FaList className="w-5 h-5" />
            <p className="ml-3 text-orange-500 hidden md:block">List Items</p>
          </NavLink>
        </div>

        {/* Orders */}
        <div className="ml-5 mb-2 border-r-0">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center p-3 transition-colors border-r-0 hover:bg-gray-50 border ${isActive ? "border-orange-500 bg-orange-500/50" : "border-black border"
              }`
            }
          >
            <FaShoppingCart className="w-5 h-5 text-black" />
            <p className="ml-3 text-orange-500 hidden md:block">Orders</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
