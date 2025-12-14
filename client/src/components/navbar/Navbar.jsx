import { IoSearch } from 'react-icons/io5';
import { FiShoppingCart } from 'react-icons/fi';
import { IoBag } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { StoreContext } from '../../StoreContext';
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin }) => {
  const { token, setToken, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Check if cart has any items
  const hasCartItems = () => {
    return Object.keys(cartItems).some(key => cartItems[key] > 0);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 h-[80px] sm:h-[90px] lg:h-[100px] flex z-50 justify-between items-center bg-white mx-auto fixed top-0 left-1/2 w-full -translate-x-1/2 shadow-sm">

        {/* Logo */}
        <NavLink to={'/'} onClick={closeSidebar}>
          <img
            src={assets.logo}
            alt="Logo"
            className="h-[80px] w-[100px] sm:h-[100px] sm:w-[130px] lg:h-[120px] lg:w-[150px]"
          />
        </NavLink>

        {/* Desktop Menu - Hidden on mobile */}
        <ul className="hidden lg:flex gap-10 text-[15px] text-[#747477] font-sans">
          <NavLink to={'/'}>
            <li className="relative cursor-pointer hover:text-black transition-colors duration-300 
              before:absolute before:left-0 before:bottom-0
              before:h-[3px] before:bg-orange-400 before:rounded-full
              before:w-0 hover:before:w-full
              before:transition-all before:duration-400">
              Home
            </li>
          </NavLink>
          <NavLink to={'/menu'}>
            <li className="relative cursor-pointer hover:text-black transition-colors duration-300 
              before:absolute before:left-0 before:bottom-0
              before:h-[3px] before:bg-orange-400 before:rounded-full
              before:w-0 hover:before:w-full
              before:transition-all before:duration-400">
              Menu
            </li>
          </NavLink>
          <NavLink to={'/about'}>
            <li className="relative cursor-pointer hover:text-black transition-colors duration-300 
              before:absolute before:left-0 before:bottom-0
              before:h-[3px] before:bg-orange-400 before:rounded-full
              before:w-0 hover:before:w-full
              before:transition-all before:duration-400">
              About Us
            </li>
          </NavLink>
          <NavLink to={'/contact-us'}>
            <li className="relative cursor-pointer hover:text-black transition-colors duration-300 
              before:absolute before:left-0 before:bottom-0
              before:h-[3px] before:bg-orange-400 before:rounded-full
              before:w-0 hover:before:w-full
              before:transition-all before:duration-400">
              Contact us
            </li>
          </NavLink>
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
          {/* Search Icon */}
          <div className="text-xl sm:text-2xl text-[#747477] hover:text-orange-400 cursor-pointer transition-colors duration-300">
            <NavLink to={'/menu'}>
              <IoSearch />
            </NavLink>
          </div>

          {/* Cart Icon */}
          <div className="relative text-xl sm:text-2xl text-[#747477] hover:text-orange-400 cursor-pointer transition-colors duration-300">
            <NavLink to={'/cart'}>
              <FiShoppingCart />
            </NavLink>
            {hasCartItems() && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            )}
          </div>

          {/* Sign In / User Menu - Hidden on small screens */}
          <div className='hidden sm:block'>
            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className="text-orange-400 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-sm lg:text-base border border-orange-400 rounded-full 
                hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Sign in
              </button>
            ) : (
              <div className="relative group cursor-pointer">
                <FaUserCircle className="text-2xl sm:text-3xl text-[#747477]" />
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md 
                  py-2 opacity-0 invisible group-hover:opacity-100 
                  group-hover:visible transition-all duration-300 z-50">
                  <li onClick={() => navigate('/myorders')} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                    <IoBag className="text-gray-600" />
                    <p>Orders</p>
                  </li>
                  <hr className="my-1" />
                  <li onClick={logout} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                    <IoLogOutOutline className="text-red-500" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger Menu - Visible only on mobile/tablet */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-2xl sm:text-3xl text-[#747477] hover:text-orange-400 transition-colors duration-300"
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>

        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <img src={assets.logo} alt="Logo" className="h-[60px] w-[80px]" />
          <button
            onClick={closeSidebar}
            className="text-3xl text-gray-600 hover:text-orange-400 transition-colors"
          >
            <IoClose />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-6">
          <ul className="space-y-6">
            <NavLink to={'/'} onClick={closeSidebar}>
              <li className="text-lg text-[#747477] hover:text-orange-400 transition-colors cursor-pointer font-medium">
                Home
              </li>
            </NavLink>
            <NavLink to={'/menu'} onClick={closeSidebar}>
              <li className="text-lg text-[#747477] hover:text-orange-400 transition-colors cursor-pointer font-medium">
                Menu
              </li>
            </NavLink>
            <NavLink to={'/about'} onClick={closeSidebar}>
              <li className="text-lg text-[#747477] hover:text-orange-400 transition-colors cursor-pointer font-medium">
                About Us
              </li>
            </NavLink>
            <NavLink to={'/contact-us'} onClick={closeSidebar}>
              <li className="text-lg text-[#747477] hover:text-orange-400 transition-colors cursor-pointer font-medium">
                Contact us
              </li>
            </NavLink>
          </ul>

          {/* Mobile Auth Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {!token ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                  closeSidebar();
                }}
                className="w-full text-orange-400 px-5 py-2.5 border border-orange-400 rounded-full 
                hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer font-medium"
              >
                Sign in
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    navigate('/myorders');
                    closeSidebar();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                >
                  <IoBag className="text-xl" />
                  <span className="font-medium">My Orders</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    closeSidebar();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-red-500"
                >
                  <IoLogOutOutline className="text-xl" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-[90] lg:hidden transition-opacity duration-300"
        />
      )}
    </>
  );
};

export default Navbar;
