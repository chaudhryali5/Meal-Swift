import React, { useEffect, useRef } from 'react';
import {
    FaRocket,
    FaHeart,
    FaUsers,
    FaStar,
    FaTruck,
    FaShieldAlt,
    FaCheckCircle,
    FaUtensils,
    FaClock,
    FaLeaf,
    FaAward,
    FaHandshake
} from 'react-icons/fa';
import { MdRestaurant, MdDeliveryDining, MdVerified } from 'react-icons/md';
import { IoMdTrophy } from 'react-icons/io';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/footer/Footer';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
    const heroRef = useRef(null);
    const storyRef = useRef(null);
    const valuesRef = useRef([]);
    const featuresRef = useRef([]);
    const statsRef = useRef([]);
    const ctaRef = useRef(null);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);

        // Hero section animation
        gsap.from(heroRef.current, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power3.out'
        });

        // Hero title animation
        const heroTitle = heroRef.current?.querySelector('.hero-title');
        if (heroTitle) {
            gsap.from(heroTitle, {
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                delay: 0.3,
                ease: 'elastic.out(1, 0.5)'
            });
        }

        // Story section animation
        if (storyRef.current) {
            gsap.from(storyRef.current, {
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        }

        // Values cards animation
        valuesRef.current.forEach((card, index) => {
            if (card) {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 60,
                    rotation: index % 2 === 0 ? -5 : 5,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                });

                // Icon animation
                const icon = card.querySelector('.value-icon');
                if (icon) {
                    gsap.from(icon, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        scale: 0,
                        rotation: 360,
                        duration: 1,
                        delay: index * 0.1 + 0.2,
                        ease: 'elastic.out(1, 0.6)'
                    });
                }

                // Hover effects
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.05,
                        y: -10,
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    if (icon) {
                        gsap.to(icon, {
                            rotation: 10,
                            scale: 1.1,
                            duration: 0.3,
                            ease: 'back.out(1.7)'
                        });
                    }
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        y: 0,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    if (icon) {
                        gsap.to(icon, {
                            rotation: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });
            }
        });

        // Features animation
        featuresRef.current.forEach((feature, index) => {
            if (feature) {
                gsap.from(feature, {
                    scrollTrigger: {
                        trigger: feature,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }
        });

        // Stats animation
        statsRef.current.forEach((stat, index) => {
            if (stat) {
                gsap.from(stat, {
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'back.out(1.7)'
                });
            }
        });

        // CTA animation
        if (ctaRef.current) {
            gsap.from(ctaRef.current, {
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const values = [
        {
            icon: <FaStar className="text-4xl sm:text-5xl text-yellow-500" />,
            title: "Quality First",
            description: "We partner with the best restaurants to ensure every meal meets our high standards of excellence."
        },
        {
            icon: <FaTruck className="text-4xl sm:text-5xl text-blue-500" />,
            title: "Lightning Fast",
            description: "Your food arrives hot and fresh with our optimized delivery network and dedicated drivers."
        },
        {
            icon: <FaShieldAlt className="text-4xl sm:text-5xl text-green-500" />,
            title: "Trusted & Safe",
            description: "Your data and payments are protected with bank-level security and encryption."
        },
        {
            icon: <FaHeart className="text-4xl sm:text-5xl text-red-500" />,
            title: "Customer Love",
            description: "We're obsessed with making you happy. Every order, every time, no exceptions."
        },
        {
            icon: <FaLeaf className="text-4xl sm:text-5xl text-emerald-500" />,
            title: "Eco-Friendly",
            description: "Sustainable packaging and carbon-neutral delivery options for a greener future."
        },
        {
            icon: <FaHandshake className="text-4xl sm:text-5xl text-purple-500" />,
            title: "Community First",
            description: "Supporting local restaurants and creating jobs in your neighborhood."
        }
    ];

    const features = [
        {
            icon: <MdRestaurant className="text-3xl text-orange-500" />,
            title: "Curated Restaurants",
            description: "Hand-picked partners serving the best cuisine in your area"
        },
        {
            icon: <FaClock className="text-3xl text-blue-500" />,
            title: "Real-Time Tracking",
            description: "Know exactly where your food is, from kitchen to doorstep"
        },
        {
            icon: <FaUtensils className="text-3xl text-green-500" />,
            title: "Diverse Cuisines",
            description: "From local favorites to international delights, we have it all"
        },
        {
            icon: <MdDeliveryDining className="text-3xl text-purple-500" />,
            title: "Professional Drivers",
            description: "Trained, verified, and committed to excellent service"
        }
    ];

    const stats = [
        { number: "50K+", label: "Happy Customers", icon: <FaUsers className="text-3xl sm:text-4xl" /> },
        { number: "200+", label: "Restaurant Partners", icon: <MdRestaurant className="text-3xl sm:text-4xl" /> },
        { number: "100K+", label: "Orders Delivered", icon: <FaTruck className="text-3xl sm:text-4xl" /> },
        { number: "4.8★", label: "Average Rating", icon: <IoMdTrophy className="text-3xl sm:text-4xl" /> }
    ];

    return (
        <>
            <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-x-hidden">
                {/* Hero Section */}
                <div
                    ref={heroRef}
                    className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 text-white py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden"
                >
                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 left-1/3 w-24 h-24 sm:w-36 sm:h-36 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="max-w-6xl mx-auto text-center relative z-10">
                        <h1 className="hero-title  text-orange-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
                            About <span className="text-black">MealSwift</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed px-2">
                            Delivering happiness, one meal at a time. We're on a mission to connect food lovers with the best local restaurants.
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
                            <MdVerified className="text-2xl sm:text-3xl" />
                            <span className="text-sm sm:text-base">Trusted by 50,000+ customers</span>
                        </div>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                    <div
                        ref={storyRef}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gray-100"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                            <FaRocket className="text-4xl sm:text-5xl text-orange-500" />
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Story</h2>
                        </div>
                        <div className="space-y-4 sm:space-y-6 text-gray-600 leading-relaxed">
                            <p className="text-sm sm:text-base md:text-lg">
                                MealSwift was born from a simple idea: everyone deserves access to delicious, quality food without the hassle.
                                Founded in 2020, we started with a small team and a big dream – to revolutionize food delivery.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg">
                                Today, we're proud to partner with over 200 restaurants, serving 50,000+ happy customers across the city.
                                Our technology-driven approach ensures your food arrives hot, fresh, and exactly when you expect it.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg">
                                But we're more than just a delivery service. We're a community of food lovers, restaurant partners, and dedicated drivers
                                working together to bring joy to every meal. Every order supports local businesses and creates meaningful employment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10 sm:mb-12 md:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">Our Core Values</h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    ref={el => valuesRef.current[index] = el}
                                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 cursor-pointer will-change-transform"
                                >
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-5 rounded-xl mb-4 sm:mb-6 inline-block value-icon">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{value.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                    <div className="text-center mb-10 sm:mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">Why Choose MealSwift?</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                            We go above and beyond to make your food delivery experience exceptional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                ref={el => featuresRef.current[index] = el}
                                className="flex items-start gap-4 sm:gap-6 bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 rounded-xl flex-shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 py-12 sm:py-16 md:py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10 sm:mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Our Impact</h2>
                            <p className="text-sm sm:text-base md:text-lg text-orange-100 max-w-2xl mx-auto">
                                Numbers that tell our story
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    ref={el => statsRef.current[index] = el}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-white/20"
                                >
                                    <div className="flex justify-center mb-3 sm:mb-4 text-white">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                    <div className="text-xs sm:text-sm md:text-base text-orange-100">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                    <div
                        ref={ctaRef}
                        className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative z-10">
                            <FaAward className="text-5xl sm:text-6xl md:text-7xl mx-auto mb-4 sm:mb-6" />
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Ready to Experience the Difference?</h2>
                            <p className="text-base sm:text-lg md:text-xl text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                                Join thousands of satisfied customers and discover why MealSwift is the #1 choice for food delivery.
                            </p>
                            <button
                                onClick={() => window.location.href = '/menu'}
                                className="bg-white text-orange-600 px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
