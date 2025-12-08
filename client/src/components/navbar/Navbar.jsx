
import { IoSearch } from 'react-icons/io5';
import { FiShoppingCart } from 'react-icons/fi';
import { IoBag } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../StoreContext';
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ setShowLogin }) => {
  const { token, setToken, cartItems } = useContext(StoreContext)
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    setToken("")
    navigate("/")
  }

  // Check if cart has any items
  const hasCartItems = () => {
    return Object.keys(cartItems).some(key => cartItems[key] > 0)
  }

  return (
    <>

      <div className="py-6   px-8 h-[100px]  flex  z-50 justify-between items-center bg-white   mx-auto fixed  top-0 left-1/2 w-full -translate-x-1/2  ">
        <NavLink to={'/'}>
          <img
            src={assets.logo}
            alt="Logo"
            className="h-[120px] w-[150px]"
          />
        </NavLink>
        <ul className="hidden lg:flex gap-10 text-[15px] text-[#747477] font-sans ">
          <NavLink to={'/'}>
            <li className="
              relative cursor-pointer hover:text-black  transition-colors duration-300 
               before:absolute before:left-0 before:bottom-0
              before:h-[3px] before:bg-orange-400 before:rounded-full
              before:w-0 hover:before:w-full
              before:transition-all before:duration-400
                 ">Home</li>
          </NavLink>
          <NavLink to={'/menu'}>
            <li className="
              relative cursor-pointer hover:text-black transition-colors duration-300 
               before:absolute before:left-0 before:bottom-0
              before:h-[3px] before:bg-orange-400 before:rounded-full
              before:w-0 hover:before:w-full
              before:transition-all before:duration-400
            " >Menu</li>
          </NavLink>
          <NavLink to={'/about'}>
            <li className="
              relative cursor-pointer hover:text-black transition-colors duration-300 
               before:absolute before:left-0 before:bottom-0
              before:h-[3px] before:bg-orange-400 before:rounded-full
              before:w-0 hover:before:w-full
              before:transition-all before:duration-400
            " >About Us</li>
          </NavLink>
          <NavLink to={'/contact-us'}>
            <li className="
              relative cursor-pointer hover:text-black transition-colors duration-300 
               before:absolute before:left-0 before:bottom-0
              before:h-[3px] before:bg-orange-400 before:rounded-full
              before:w-0 hover:before:w-full
              before:transition-all before:duration-400
            ">Contact us</li>
          </NavLink>

        </ul>
        <div className="flex items-center gap-5 icons">
          <div className="text-2xl text-[#747477] hover:text-orange-400 cursor-pointer transition-colors duration-300">
            <NavLink to={'/menu'}>
              <IoSearch />
            </NavLink>
          </div>
          <div className="relative text-2xl text-[#747477] hover:text-orange-400 cursor-pointer transition-colors duration-300">
            <NavLink to={'/cart'}>
              <FiShoppingCart />
            </NavLink>
            {/* Orange dot indicator */}
            {hasCartItems() && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            )}
          </div>
          <div className='btn'>

            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className="text-orange-400 px-5 py-2 border border-orange-400 rounded-full 
               hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Sign in
              </button>
            ) : (
              <div className="relative group cursor-pointer">
                {/* User Icon */}
                <FaUserCircle className="text-3xl text-[#747477]" />

                {/* Dropdown Menu */}
                <ul
                  className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md 
                 py-2 opacity-0 invisible group-hover:opacity-100 
                 group-hover:visible transition-all duration-300"
                >
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

        </div>

      </div>


    </>
  );
};

export default Navbar;
