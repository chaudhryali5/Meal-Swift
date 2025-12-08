import React from 'react'

import Header from '../../components/header/Header'
// import Navbar from '../../components/navbar/Navbar'
import MenuList from '../../components/Menu/MenuList'
import Menu from '../../components/Menu/Menu'
import { useState } from 'react'
import Footer from '../../components/footer/Footer'

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      {/* <Navbar/> */}
      <Header />
      <MenuList category={category} setCategory={setCategory} />
      <Menu category={category} />
      <Footer />
    </>
  )
}

export default Home