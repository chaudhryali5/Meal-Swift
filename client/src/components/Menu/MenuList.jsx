import React, { useRef } from 'react';
import { menuItem } from '../../assets/assets';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MenuList = ({ category, setCategory }) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const scrollRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%", // Animation starts when top of container hits 80% of viewport height
                toggleActions: "play none none reverse"
            }
        });

        tl.from(titleRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.6
        })
            .from(descRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.6
            }, "-=0.3")
            .from(".menu-item", {
                x: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1
            }, "-=0.3");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className='w-[80%] mx-auto'>
            <div className="text-center max-w-2xl mt-[30px] mx-auto px-4">
                <h1 ref={titleRef} className="text-4xl font-bold text-orange-500 mb-4">
                    Explore Our Menu
                </h1>
                <p ref={descRef} className="text-gray-700 text-lg">
                    Explore our menu and discover flavors made to satisfy every craving.
                    From light bites to signature dishes, dive into a selection crafted just for you.
                </p>
            </div>
            <div
                ref={scrollRef}
                className="mt-10 flex space-x-4 overflow-x-auto scrollbar-hide "
            >
                {menuItem.map((item, index) => {
                    return (
                        <div
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                            key={index}
                            className="menu-item shrink-0 text-center cursor-pointer"
                        >
                            <img
                                src={item.menu_image}
                                alt={item.menu_name}
                                className={`w-30 h-30 rounded-full object-cover transition-all duration-300 ${category === item.menu_name ? "border-4 border-orange-500 p-0.5 scale-105" : "hover:scale-105"
                                    }`}
                            />

                            <p className="mt-2.5 text-sm text-gray-600 font-medium">{item.menu_name}</p>
                        </div>
                    )
                }

                )}
            </div>
            <hr className='mt-10 h-0.5 bg-[#e2e2e2] border-none' />
        </div>
    );
};

export default MenuList;
