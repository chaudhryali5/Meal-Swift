import React, { useContext } from 'react';
import { StoreContext } from '../../StoreContext';

const FoodItem = ({ id, name, price, image }) => {

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const { url } = useContext(StoreContext)

  const quantity = cartItems[id] || 0;
  return (
    <div className="relative h-[300px] sm:h-[330px] md:h-[350px] rounded-xl overflow-hidden group cursor-pointer shadow-md">

      <img
        src={image.startsWith('http') ? image : url + "/images/" + image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>

      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
        <h3 className="text-lg md:text-xl font-semibold">{name}</h3>
        <p className="text-orange-400 font-bold text-sm mt-1">Rs {price}</p>

        <div className="mt-4 flex justify-center">
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(id)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition shadow-lg"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => removeFromCart(id)}
                className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 bg-red-100 hover:bg-red-200 text-red-600 font-bold text-lg sm:text-xl"
              >
                −
              </button>
              <span className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 font-bold text-orange-600 text-sm sm:text-base md:text-lg min-w-6 sm:min-w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => addToCart(id)}
                className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg sm:text-xl"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to- from-black/70 to-transparent"></div>
    </div>
  );
};

export default FoodItem;