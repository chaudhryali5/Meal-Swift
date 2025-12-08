import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const images = [
        "/header2-img.jpg",
        "/header-img.jpg"
    ]
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } })

        tl.from(
            [".heading", ".para", ".btn"],
            {
                opacity: 0,
                scale: 0.8,
                z: -50,
                stagger: 0.3
            }
        )
    }, [])

    return (
        <div className='mt-30'>
            <div className="relative mx-auto h-[500px] flex items-center justify-center w-[80%]">
                <img src={images[currentIndex]} className="w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ease-in-out  opacity-100" />
                <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
                <div className="absolute bottom-[22%] left-3 sm:left-10  md:left-16 lg:left-6 text-left px-4 max-w-xl">
                    <h2 className="heading text-orange-500 leading-11 text-3xl lg:text-[45px] sm:text-4xl :text-4xl default:text-4xl font-extrabold mb-4 drop-shadow-lg">
                        Craving Something? Order Your Favourites Now
                    </h2>
                    <p className="para text-gray-200 lg:leading-8  leading-8 text-[15px] lg:text-lg drop-shadow-lg">
                        From light bites to hearty meals, our menu offers
                        exceptional taste and freshness in every order. Place
                        your order in seconds and enjoy a high-quality dining
                        experience at home.
                    </p>

                </div>
                <div className="absolute btn inset-0 flex items-center justify-center top-[80%]">
                  <NavLink to={'/menu'}>
                      <button
                        className="border border-white/15 bg-white/10 
               text-black font-semibold py-2 px-6 transition-all duration-300 
               shadow-lg transform hover:-translate-y-2"
                    >
                        View Menu
                    </button>
                  </NavLink>
                </div>

            </div>
        </div>
    )
}
export default Header
