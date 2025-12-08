import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../StoreContext.js'
import { assets } from '../../assets/assets.js'
import axios from 'axios'

const MyOrders = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrder = async () => {
        try {
            setLoading(true)
            const response = await axios.post(url + "/api/v1/userorders", {}, { headers: { token } })
            setData(response.data.data)
        } catch (error) {
            console.error("Error fetching orders:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrder()
        }
    }, [token])

    return (
        <div className='my-orders mt-16 mx-4 sm:mx-12 min-h-[60vh]'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6 text-gray-800'>My Orders</h2>

            {loading ? (
                <div className='flex justify-center py-10'>
                    <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500'></div>
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    {data.map((order, index) => {
                        return (
                            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-3 sm:gap-6 text-xs sm:text-sm py-3 px-4 text-gray-700 border border-gray-200 rounded-lg shadow-sm bg-white'>
                                {/* Icon - Hidden on very small screens if needed, or kept small */}
                                <div className='flex items-center gap-3 sm:contents'>
                                    <img src={assets.parcel_icon} alt="" className='w-8 sm:w-10' />

                                    {/* Mobile-only header info */}
                                    <div className='sm:hidden flex-1 flex justify-between items-center'>
                                        <span className='font-bold text-gray-800'>${order.amount}.00</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.Status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {order.Status}
                                        </span>
                                    </div>
                                </div>

                                <p className='text-gray-600 leading-relaxed'>
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        }
                                        else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}
                                </p>

                                <p className='hidden sm:block font-medium'>${order.amount}.00</p>
                                <p className='hidden sm:block'>Items: {order.items.length}</p>
                                <p className='hidden sm:block'>
                                    <span className='text-orange-500'>&#x25cf;</span> <b>{order.Status}</b>
                                </p>

                                <button onClick={fetchOrder} className='w-full sm:w-auto py-2 px-4 rounded bg-orange-50 text-gray-700 text-xs font-medium hover:bg-orange-500 hover:text-white transition-colors duration-200 border border-orange-100'>
                                    Track Order
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default MyOrders
