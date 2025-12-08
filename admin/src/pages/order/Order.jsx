import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets.js'

const Order = ({ url }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/v1/orderlist")
      if (response.data.status) {
        setOrders(response.data.data)
      } else {
        toast.error("Error fetching orders")
      }
    } catch (error) {
      toast.error("Network Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/v1/status", { orderId, status: event.target.value })
      if (response.data.status) {
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error("Error updating status")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='p-4 sm:p-8 w-full bg-gray-50 min-h-screen'>
      <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-6'>Order Management</h3>

      <div className='flex flex-col gap-4'>
        {orders.map((order, index) => (
          <div key={index} className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 sm:gap-6 items-start text-sm text-gray-700 animate-fadeIn'>

            {/* Icon */}
            <div className='hidden md:flex justify-center'>
              <img src={assets.parcel_icon} alt="Parcel" className='w-10 sm:w-12 opacity-80' />
            </div>

            {/* Order Items & Address */}
            <div className='space-y-3'>
              <div className='flex items-start gap-3 md:hidden mb-2'>
                <img src={assets.parcel_icon} alt="Parcel" className='w-8 opacity-80' />
                <span className='font-semibold text-gray-900'>Order #{index + 1}</span>
              </div>

              <p className='font-medium text-gray-800 leading-relaxed'>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} <span className='text-orange-500'>x{item.quantity}</span>
                    {idx !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>

              <div className='text-xs sm:text-sm text-gray-600 space-y-1'>
                <p className='font-semibold text-gray-800'>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                <p className='mt-2 flex items-center gap-2'>
                  <span className='text-gray-400'>📞</span> {order.address.phone}
                </p>
              </div>
            </div>

            {/* Items Count */}
            <div className='flex items-center gap-2 md:block'>
              <span className='md:hidden font-medium text-gray-500'>Items:</span>
              <p className='font-medium'>{order.items.length} Items</p>
            </div>

            {/* Amount */}
            <div className='flex items-center gap-2 md:block'>
              <span className='md:hidden font-medium text-gray-500'>Total:</span>
              <p className='font-bold text-gray-800'>${order.amount}</p>
            </div>

            {/* Status Dropdown */}
            <div className='w-full'>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className='w-full bg-orange-50 border border-orange-200 text-gray-700 text-xs sm:text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer hover:bg-orange-100 transition-colors'
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Order