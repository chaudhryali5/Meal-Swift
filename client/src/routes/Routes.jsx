import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ContactPage from "../pages/ContactPage";
import MobilePge from "../pages/MobilePge";
import AboutUs from "../pages/AboutUs.jsx";

// import LoginPopup from "../components/loginPopUp/LoginPopup";
import Navbar from "../components/navbar/Navbar";
import Cart from "../pages/cart/Cart";
import LoginPopup from "../components/loginPopUp/LoginPopup.jsx";
import PlaceOrder from "../pages/placeOrder/PlaceOrder";
import PrivacyPolicy from "../components/privacyPolicy/PrivacyPolicy.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import SmoothScroll from "../components/SmoothScroll.jsx";

import { useState } from "react";
import Verify from "../verify/Verify.jsx";
import MyOrders from "../pages/myOrders/MyOrders.jsx";
import MealMenu from "../pages/MenuPage/MealMenu.jsx";


const Router = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <SmoothScroll>
      <ScrollToTop />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div>

        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={< MealMenu />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        </Routes>

      </div>

    </SmoothScroll>
  )
}

export default Router