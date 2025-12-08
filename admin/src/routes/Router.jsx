import React from 'react'
import NavBar from '../components/navbar/NavBar'
import SideBar from '../components/sidebar/SideBar'
import { Routes, Route } from 'react-router-dom'
import Add from '../pages/add/Add'
  import { ToastContainer } from 'react-toastify';
  
import List from '../pages/list/List'
import Order from '../pages/order/Order'
const Router = () => {
  // const url ="http://localhost:5000"
  return (
    <div>
      <ToastContainer/>
      <NavBar />
      <hr />
      <div className='flex '>
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add /> } />
          <Route path='/list' element={<List   />} />
          <Route path='/orders' element={<Order  />} />
        </Routes>
      </div>
    </div>
  )
}

export default Router