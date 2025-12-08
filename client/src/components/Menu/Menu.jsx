import React, { useContext, useRef } from 'react';
import { StoreContext } from '../../StoreContext.js';
import FoodItem from '../foodItem/FoodItem';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Menu = ({ category }) => {
  const { menuList } = useContext(StoreContext);
  const containerRef = useRef(null);

  useGSAP(() => {
    if (menuList.length === 0) return;
    console.log(menuList)

    gsap.from(".food-card", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: containerRef, dependencies: [menuList, category] });

  return (
    <div ref={containerRef} className="w-[80%] mx-auto mt-10">

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {menuList
          .filter((item) => category === "All" || category === item.category)
          .reverse()
          .slice(0, 15)
          .map((item) => (
            <div key={item._id} className="food-card">
              <FoodItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;