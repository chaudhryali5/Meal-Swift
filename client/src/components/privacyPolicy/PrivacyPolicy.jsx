import React, { useEffect, useRef } from 'react';
import {
    FaShieldAlt,
    FaLock,
    FaUserShield,
    FaCookie,
    FaDatabase,
    FaEnvelope,
    FaCheckCircle,
    FaExclamationTriangle,
    FaUserClock,
    FaGlobe,
    FaArrowDown
} from 'react-icons/fa';
import { MdSecurity, MdPrivacyTip, MdVerifiedUser } from 'react-icons/md';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicy = () => {
    const heroRef = useRef(null);
    const shieldRef = useRef(null);
    const badgesRef = useRef(null);
    const sectionsRef = useRef([]);
    const introRef = useRef(null);
    const retentionRef = useRef(null);
    const contactRef = useRef(null);

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

        // Shield icon animation with rotation and scale
        gsap.from(shieldRef.current, {
            scale: 0,
            rotation: -180,
            duration: 1.2,
            delay: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });

        // Floating animation for shield
        gsap.to(shieldRef.current, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        // Trust badges animation
        gsap.from(badgesRef.current.children, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            delay: 0.5,
            ease: 'back.out(1.7)'
        });

        // Sections scroll animation with enhanced effects
        sectionsRef.current.forEach((section, index) => {
            if (section) {
                // Main card entrance animation
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 60,
                    rotation: index % 2 === 0 ? -3 : 3,
                    duration: 1,
                    ease: 'power3.out'
                });

                // Animate icon within the card
                const icon = section.querySelector('.card-icon');
                if (icon) {
                    gsap.from(icon, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        },
                        scale: 0,
                        rotation: 360,
                        duration: 1.2,
                        delay: 0.2,
                        ease: 'elastic.out(1, 0.6)'
                    });
                }

                // Animate list items with stagger
                const listItems = section.querySelectorAll('.list-item');
                if (listItems.length > 0) {
                    gsap.from(listItems, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        },
                        opacity: 0,
                        x: -20,
                        stagger: 0.1,
                        duration: 0.6,
                        delay: 0.4,
                        ease: 'power2.out'
                    });
                }

                // Enhanced hover animation for sections
                section.addEventListener('mouseenter', () => {
                    gsap.to(section, {
                        scale: 1.05,
                        y: -8,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    // Icon bounce on hover
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1.1,
                            rotation: 5,
                            duration: 0.3,
                            ease: 'back.out(1.7)'
                        });
                    }

                    // Animate checkmarks on hover
                    const checkmarks = section.querySelectorAll('.check-icon');
                    gsap.to(checkmarks, {
                        scale: 1.2,
                        stagger: 0.05,
                        duration: 0.3,
                        ease: 'back.out(2)'
                    });
                });

                section.addEventListener('mouseleave', () => {
                    gsap.to(section, {
                        scale: 1,
                        y: 0,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    // Reset icon
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }

                    // Reset checkmarks
                    const checkmarks = section.querySelectorAll('.check-icon');
                    gsap.to(checkmarks, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        });

        // Introduction card animation
        if (introRef.current) {
            gsap.from(introRef.current, {
                scrollTrigger: {
                    trigger: introRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out'
            });

            // Hover effect for intro card
            introRef.current.addEventListener('mouseenter', () => {
                gsap.to(introRef.current, {
                    y: -5,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            introRef.current.addEventListener('mouseleave', () => {
                gsap.to(introRef.current, {
                    y: 0,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }

        // Data retention card animation
        if (retentionRef.current) {
            gsap.from(retentionRef.current, {
                scrollTrigger: {
                    trigger: retentionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                scale: 0.95,
                y: 40,
                duration: 0.9,
                ease: 'back.out(1.4)'
            });

            // Animate icon in retention card
            const retentionIcon = retentionRef.current.querySelector('.retention-icon');
            if (retentionIcon) {
                gsap.from(retentionIcon, {
                    scrollTrigger: {
                        trigger: retentionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    scale: 0,
                    rotation: -180,
                    duration: 1,
                    delay: 0.2,
                    ease: 'elastic.out(1, 0.6)'
                });
            }

            // Hover effect for retention card
            retentionRef.current.addEventListener('mouseenter', () => {
                gsap.to(retentionRef.current, {
                    scale: 1.02,
                    y: -5,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                });

                if (retentionIcon) {
                    gsap.to(retentionIcon, {
                        rotation: 10,
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                }
            });

            retentionRef.current.addEventListener('mouseleave', () => {
                gsap.to(retentionRef.current, {
                    scale: 1,
                    y: 0,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });

                if (retentionIcon) {
                    gsap.to(retentionIcon, {
                        rotation: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        }

        // Contact section animation
        if (contactRef.current) {
            gsap.from(contactRef.current, {
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const sections = [
        {
            icon: <FaDatabase className="text-3xl sm:text-4xl text-orange-500" />,
            title: "Information We Collect",
            gradient: "from-orange-50 to-red-50",
            content: [
                "Personal information (name, email, phone number, delivery address)",
                "Payment information (processed securely through encrypted channels)",
                "Order history and preferences",
                "Device information and IP address",
                "Location data for delivery purposes"
            ]
        },
        {
            icon: <FaUserShield className="text-3xl sm:text-4xl text-blue-500" />,
            title: "How We Use Your Information",
            gradient: "from-blue-50 to-indigo-50",
            content: [
                "Process and deliver your food orders",
                "Communicate order status and updates",
                "Improve our services and user experience",
                "Send promotional offers (with your consent)",
                "Prevent fraud and ensure platform security"
            ]
        },
        {
            icon: <FaLock className="text-3xl sm:text-4xl text-green-500" />,
            title: "Data Security",
            gradient: "from-green-50 to-emerald-50",
            content: [
                "256-bit SSL encryption for all data transmission",
                "Secure payment processing with PCI DSS compliance",
                "Regular security audits and vulnerability assessments",
                "Restricted access to personal data on need-to-know basis",
                "Encrypted storage of sensitive information"
            ]
        },
        {
            icon: <FaCookie className="text-3xl sm:text-4xl text-purple-500" />,
            title: "Cookies & Tracking",
            gradient: "from-purple-50 to-pink-50",
            content: [
                "Essential cookies for platform functionality",
                "Analytics cookies to improve user experience",
                "Preference cookies to remember your settings",
                "You can manage cookie preferences in your browser",
                "Third-party cookies from payment processors"
            ]
        },
        {
            icon: <FaGlobe className="text-3xl sm:text-4xl text-cyan-500" />,
            title: "Third-Party Sharing",
            gradient: "from-cyan-50 to-teal-50",
            content: [
                "Restaurant partners (only order details)",
                "Delivery partners (only delivery information)",
                "Payment processors (for transaction processing)",
                "We never sell your personal data to third parties",
                "All partners are bound by strict confidentiality agreements"
            ]
        },
        {
            icon: <FaUserClock className="text-3xl sm:text-4xl text-red-500" />,
            title: "Your Rights",
            gradient: "from-red-50 to-orange-50",
            content: [
                "Access your personal data at any time",
                "Request correction of inaccurate information",
                "Delete your account and associated data",
                "Opt-out of marketing communications",
                "Export your data in a portable format"
            ]
        }
    ];

    return (
        <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-x-hidden">
            {/* Hero Section */}
            <div
                ref={heroRef}
                className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 overflow-hidden"
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-40 sm:h-40 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div
                            ref={shieldRef}
                            className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-full shadow-2xl"
                        >
                            <FaShieldAlt className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-100 max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
                        Your privacy is our priority. Learn how MealSwift protects and manages your personal information.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 text-xs sm:text-sm">
                        <MdVerifiedUser className="text-lg sm:text-xl" />
                        <span>Last updated: November 2025</span>
                    </div>

                    {/* Scroll indicator */}
                    <div className="mt-6 sm:mt-8 animate-bounce">
                        <FaArrowDown className="text-xl sm:text-2xl mx-auto opacity-70" />
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 -mt-6 sm:-mt-8 md:-mt-10 relative z-20">
                <div
                    ref={badgesRef}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border border-gray-100"
                >
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-0 bg-green-50 sm:bg-transparent rounded-lg sm:rounded-none">
                        <div className="bg-green-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                            <MdSecurity className="text-2xl sm:text-3xl text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-gray-800">SSL Encrypted</h3>
                            <p className="text-xs sm:text-sm text-gray-600">Bank-level security</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-0 bg-blue-50 sm:bg-transparent rounded-lg sm:rounded-none">
                        <div className="bg-blue-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                            <MdPrivacyTip className="text-2xl sm:text-3xl text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-gray-800">GDPR Compliant</h3>
                            <p className="text-xs sm:text-sm text-gray-600">Your data, your rights</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-0 bg-orange-50 sm:bg-transparent rounded-lg sm:rounded-none">
                        <div className="bg-orange-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                            <FaCheckCircle className="text-2xl sm:text-3xl text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-gray-800">No Data Selling</h3>
                            <p className="text-xs sm:text-sm text-gray-600">We never sell your info</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
                {/* Introduction */}
                <div ref={introRef} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-100 cursor-pointer will-change-transform">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Welcome to MealSwift</h2>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                        At MealSwift, we are committed to protecting your privacy and ensuring the security of your personal information.
                        This Privacy Policy explains how we collect, use, store, and protect your data when you use our food delivery platform.
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        By using MealSwift, you agree to the collection and use of information in accordance with this policy.
                        We encourage you to read this policy carefully to understand our practices.
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            ref={el => sectionsRef.current[index] = el}
                            className={`bg-gradient-to-br ${section.gradient} rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200 transition-all duration-300 cursor-pointer will-change-transform`}
                        >
                            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md flex-shrink-0 card-icon">
                                    {section.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mt-1 sm:mt-2">{section.title}</h3>
                            </div>
                            <ul className="space-y-2 sm:space-y-3">
                                {section.content.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 sm:gap-3 text-gray-700 list-item">
                                        <FaCheckCircle className="text-green-500 mt-0.5 sm:mt-1 flex-shrink-0 text-sm sm:text-base check-icon" />
                                        <span className="text-xs sm:text-sm md:text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Data Retention */}
                <div ref={retentionRef} className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-2 border-blue-200 cursor-pointer will-change-transform">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md retention-icon">
                            <FaExclamationTriangle className="text-2xl sm:text-3xl text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">Data Retention</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy.
                                Order history is kept for 7 years for legal and accounting purposes. Account data is deleted within 30 days of account closure request.
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                                You can request deletion of your data at any time by contacting our support team. We will process your request within 30 days.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div
                    ref={contactRef}
                    className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden"
                >
                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-40 sm:h-40 bg-white rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
                            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg">
                                <FaEnvelope className="text-3xl sm:text-4xl" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Questions About Privacy?</h3>
                                <p className="text-xs sm:text-sm md:text-base text-orange-100">
                                    Our team is here to help you understand how we protect your data.
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-right bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 w-full md:w-auto">
                            <p className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Contact our Privacy Team</p>
                            <a
                                href="mailto:privacy@mealswift.com"
                                className="text-base sm:text-lg md:text-xl font-bold hover:text-orange-200 transition block break-all"
                            >
                                privacy@mealswift.com
                            </a>
                            <p className="text-xs sm:text-sm text-orange-100 mt-1 sm:mt-2">+1-212-456-7890</p>
                        </div>
                    </div>
                </div>

                {/* Updates Notice */}
                <div className="mt-6 sm:mt-8 text-center text-gray-600 px-2">
                    <p className="text-xs sm:text-sm leading-relaxed">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page
                        and updating the "Last updated" date.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
