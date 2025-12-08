import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../StoreContext.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const OrderPlace = () => {
  const { getTotalCartAmount, token, cartItems, url, menuList } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""

  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    menuList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount(),

    }
    let response = await axios.post(url + "/api/v1/place", orderData, { headers: { token } })
    if (response.data.status) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    } else {
      alert("error")
    }


  }
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    }
    else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 79;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen  mt-40 w-[80%] mx-auto lg:-mb-30 py-4 px-3">
      <form onSubmit={placeOrder} >
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Delivery Info */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  Delivery Information
                </h2>

                <div className="space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      name='firstName'
                      onChange={onChangeHandler}
                      value={data.firstName}
                      type="text" placeholder="First name"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />
                    <input
                      required
                      name='lastName'
                      onChange={onChangeHandler}
                      value={data.lastName}
                      type="text" placeholder="Last name"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />
                  </div>

                  <input
                    required
                    name='email'
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email" placeholder="Email address"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />

                  <input
                    required
                    name='street'
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text" placeholder="Street"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      name='city'
                      onChange={onChangeHandler}
                      value={data.city}
                      type="text" placeholder="City"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />
                    <input
                      required
                      name='state'
                      onChange={onChangeHandler}
                      value={data.state}
                      type="text" placeholder="State"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      name='zipcode'
                      onChange={onChangeHandler}
                      value={data.zipcode}
                      type="text" placeholder="Zip code"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />
                    <input
                      required
                      name='country'
                      onChange={onChangeHandler}
                      value={data.country}
                      type="text" placeholder="Country"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />
                  </div>

                  <input
                    required
                    name='phone'
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="tel" placeholder="Phone"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" />

                </div>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-sm rounded-lg p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  Cart Totals
                </h2>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">{subtotal}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span>Delivery Fee</span>
                    <span className={`${deliveryFee === 0 ? 'text-green-600' : 'text-gray-800'} font-semibold`}>
                      {deliveryFee === 0 ? "FREE" : `${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between py-3">
                    <span className="font-bold text-gray-800 text-base">Total</span>
                    <span className="text-orange-500 font-bold text-xl">{total}</span>
                  </div>

                </div>

                <button
                  type='submit'
                  
                  className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md mt-5
                hover:bg-orange-600 transition transform hover:scale-[1.03] text-sm tracking-wide">
                  Proceed to Payment
                </button>

              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderPlace;
