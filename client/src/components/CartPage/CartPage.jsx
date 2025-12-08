import React, { useContext } from 'react';
import { StoreContext } from '../../StoreContext.js';
import { MdDelete } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, menuList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate()

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : (subtotal >= 999 ? 0 : 79);
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-white mt-20 py-4 px-3">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-2 mt-6">
          <FiShoppingCart className="text-3xl text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-800">Cart</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden my-6">
          <div className="hidden md:grid md:grid-cols-6 gap-4 bg-orange-100 text-black font-semibold py-3 px-4 text-sm">
            <p className="col-span-2">Items</p>
            <p className="text-center">Price</p>
            <p className="text-center">Qty</p>
            <p className="text-center">Total</p>
            <p className="text-center">Remove</p>
          </div>

          <div className="divide-y divide-gray-200">
            {menuList.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center py-4 px-4"
                  >
                    <div className="flex items-center justify-between md:col-span-2 gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image.startsWith('http') ? item.image : url + "/images/" + item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border"
                        />
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                      </div>

                      <div className="flex items-center gap-2 md:hidden">
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                          {cartItems[item._id]}
                        </span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </div>

                    <p className="hidden md:block text-center font-medium">{item.price}</p>

                    <div className="hidden md:flex justify-center">
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                        {cartItems[item._id]}
                      </span>
                    </div>

                    <p className="hidden md:block text-center text-orange-600 font-bold">
                      {item.price * cartItems[item._id]}
                    </p>

                    <div className="hidden md:flex justify-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {subtotal === 0 && (
            <div className="py-16 text-center">
              <FiShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-500">Your cart is empty</p>
            </div>
          )}
        </div>

        {subtotal > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">If you have a promo code, enter here</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-md transition transform hover:scale-102 w-full sm:w-auto">
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-5">Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <div className="text-right">
                    <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                      {deliveryFee === 0 ? 'Free' : `${deliveryFee}`}
                    </span>
                    {subtotal > 0 && subtotal < 999 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Add {999 - subtotal} more for <span className="text-green-600 font-medium">FREE delivery</span>
                      </p>
                    )}
                  </div>
                </div>

                <hr className="border-gray-300" />

                <div className="flex justify-between text-lg font-bold text-orange-600">
                  <span>Total</span>
                  <span>{total}</span>
                </div>
              </div>

              <button onClick={() => navigate('/order')} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-md mt-6 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;
