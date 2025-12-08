import React, { useState, useContext, useRef } from 'react';
import { StoreContext } from '../../StoreContext';
import { MdEmail, MdPhone, MdPerson, MdMessage, MdLocationOn, MdAccessTime, MdSend } from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Contact = () => {
    const { url } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    // Refs for GSAP animations
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);
    const formGridRef = useRef(null);

    // GSAP Animation
    useGSAP(() => {
        const tl = gsap.timeline();

        // Animate heading first
        tl.from(headingRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        })
            // Then subtitle
            .from(subtitleRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            // Finally the entire form grid
            .from(formGridRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.2');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post(url + '/api/v1/contact', formData);

            if (response.data.success) {
                toast.success('Message sent successfully! We\'ll get back to you soon.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                toast.error(response.data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-16 bg-white py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h1 ref={headingRef} className="text-3xl md:text-4xl font-bold text-black mb-2">
                    Contact Us
                </h1>
                <p ref={subtitleRef} className="text-sm text-gray-600 max-w-xl mx-auto">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div ref={formGridRef} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Information Section */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Visit Us Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                            <MdLocationOn className="text-xl text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-black mb-2">Visit Us</h3>
                        <p className="text-xs text-gray-600">123 Food Street, Culinary District</p>
                        <p className="text-xs text-gray-600">New York, NY 10001</p>
                    </div>

                    {/* Email Us Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                            <MdEmail className="text-xl text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-black mb-2">Email Us</h3>
                        <p className="text-xs text-gray-600">support@mealswift.com</p>
                        <p className="text-xs text-gray-600">info@mealswift.com</p>
                    </div>

                    {/* Call Us Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                            <MdPhone className="text-xl text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-black mb-2">Call Us</h3>
                        <p className="text-xs text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-xs text-gray-600">+1 (555) 987-6543</p>
                    </div>

                    {/* Working Hours Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                            <MdAccessTime className="text-xl text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-black mb-2">Working Hours</h3>
                        <p className="text-xs text-gray-600">Mon - Fri: 9:00 AM - 10:00 PM</p>
                        <p className="text-xs text-gray-600">Sat - Sun: 10:00 AM - 11:00 PM</p>
                    </div>

                    {/* Social Media Card */}
                    <div className="bg-black rounded-lg p-4">
                        <h3 className="text-sm font-bold text-white mb-3 text-center">Follow Us</h3>
                        <div className="flex justify-center gap-3">
                            <a href="#" className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-all duration-300">
                                <FaFacebookF className="text-sm" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-all duration-300">
                                <FaTwitter className="text-sm" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-all duration-300">
                                <FaInstagram className="text-sm" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-all duration-300">
                                <FaLinkedinIn className="text-sm" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-black mb-6">Send Us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="flex items-center text-black text-sm font-semibold mb-1.5">
                                    <MdPerson className="text-orange-500 text-base mr-1.5" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    disabled={loading}
                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="flex items-center text-black text-sm font-semibold mb-1.5">
                                    <MdEmail className="text-orange-500 text-base mr-1.5" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    disabled={loading}
                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
                                />
                            </div>

                            {/* Phone Input */}
                            <div>
                                <label htmlFor="phone" className="flex items-center text-black text-sm font-semibold mb-1.5">
                                    <MdPhone className="text-orange-500 text-base mr-1.5" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    disabled={loading}
                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label htmlFor="message" className="flex items-center text-black text-sm font-semibold mb-1.5">
                                    <MdMessage className="text-orange-500 text-base mr-1.5" />
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows="4"
                                    disabled={loading}
                                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <MdSend className="text-base" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
