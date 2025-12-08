import React, { useState, useContext, useMemo, useRef } from 'react';
import { StoreContext } from '../../StoreContext';
import FoodItem from '../../components/foodItem/FoodItem';
import { menuItem } from '../../assets/assets';
import Footer from "../../components/footer/Footer";
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const MealMenu = () => {
    const { menuList } = useContext(StoreContext);
    const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const searchRef = useRef(null);
    const sidebarRef = useRef(null);
    const gridRef = useRef(null);

    // GSAP Animations
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(headerRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        })
            .from(searchRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out"
            }, "-=0.3")
            .from(sidebarRef.current, {
                x: -30,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out"
            }, "-=0.3")
            .from(gridRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out"
            }, "<");

    }, { scope: containerRef });

    // Filter menu items based on search and category
    const filteredMenu = useMemo(() => {
        return menuList.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === "All" || category === item.category;
            return matchesSearch && matchesCategory;
        });
    }, [menuList, searchTerm, category]);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <>
            <div ref={containerRef} className="min-h-screen bg-white pt-20 mt-10 pb-8">
                <div className="w-[92%] max-w-[1200px] mx-auto">

                    {/* Header Section */}
                    <div ref={headerRef} className="text-center mb-6">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                            Discover Your Perfect <span className='text-orange-500'>Meal</span>
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                            Browse through our curated selection of delicious dishes.
                            Filter by category and find exactly what you're craving today.
                        </p>
                    </div>

                    {/* Search Bar & Filter Button */}
                    <div ref={searchRef} className="mb-8 max-w-2xl mx-auto flex gap-3">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Search meals..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:border-black focus:outline-none text-gray-700 text-sm shadow-sm transition-all duration-300 hover:shadow-md bg-white"
                            />
                        </div>
                        {/* Mobile Filter Button */}
                        <button
                            onClick={toggleFilters}
                            className="lg:hidden px-5 py-3 bg-black text-white rounded-full font-medium text-sm shadow-md hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            <FaFilter className="text-xs" /> Filters
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Desktop Sidebar */}
                        <div ref={sidebarRef} className="hidden lg:block w-64 shrink-0">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Categories
                                </h2>
                                <div className="space-y-1">
                                    <label className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                        <input
                                            type="checkbox"
                                            checked={category === "All"}
                                            onChange={() => setCategory("All")}
                                            className="w-4 h-4 accent-black cursor-pointer focus:ring-0 focus:outline-none"
                                        />
                                        <span className={`font-medium text-sm ${category === "All" ? 'text-black font-bold' : 'text-gray-700'}`}>
                                            All Items
                                        </span>
                                    </label>
                                    {menuItem.map((item, index) => (
                                        <label key={index} className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <input
                                                type="checkbox"
                                                checked={category === item.menu_name}
                                                onChange={() => setCategory(item.menu_name)}
                                                className="w-4 h-4 accent-black cursor-pointer focus:ring-0 focus:outline-none"
                                            />
                                            <span className={`font-medium text-sm ${category === item.menu_name ? 'text-black font-bold' : 'text-gray-700'}`}>
                                                {item.menu_name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Bottom Sheet Filters */}
                        {showFilters && (
                            <div className="fixed inset-0 z-50 lg:hidden">
                                {/* Backdrop */}
                                <div
                                    className="absolute inset-0 bg-black/50 transition-opacity"
                                    onClick={() => setShowFilters(false)}
                                ></div>

                                {/* Drawer */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 shadow-2xl transform transition-transform duration-300 max-h-[70vh] overflow-y-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold text-gray-900">Filter by Category</h2>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                                        >
                                            <FaTimes className="text-gray-600" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border ${category === "All" ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                                            <input
                                                type="checkbox"
                                                checked={category === "All"}
                                                onChange={() => {
                                                    setCategory("All");
                                                    setShowFilters(false);
                                                }}
                                                className="w-4 h-4 accent-black focus:ring-0"
                                            />
                                            <span className={`font-medium text-sm ${category === "All" ? 'text-black' : 'text-gray-700'}`}>
                                                All Items
                                            </span>
                                        </label>
                                        {menuItem.map((item, index) => (
                                            <label key={index} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border ${category === item.menu_name ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={category === item.menu_name}
                                                    onChange={() => {
                                                        setCategory(item.menu_name);
                                                        setShowFilters(false);
                                                    }}
                                                    className="w-4 h-4 accent-black focus:ring-0"
                                                />
                                                <span className={`font-medium text-sm ${category === item.menu_name ? 'text-black' : 'text-gray-700'}`}>
                                                    {item.menu_name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Menu Grid Section */}
                        <div ref={gridRef} className="flex-1">
                            {filteredMenu.length > 0 ? (
                                <>
                                    <div className="mb-4 flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                                        <div className="text-gray-700 text-sm">
                                            <span className="font-bold text-black text-lg">{filteredMenu.length}</span>
                                            <span className="ml-1 font-medium">items</span>
                                        </div>
                                    </div>

                                    {/* Updated Grid: 2 columns on mobile (xs/sm) */}
                                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                                        {filteredMenu.map((item) => (
                                            <FoodItem
                                                key={item._id}
                                                id={item._id}
                                                name={item.name}
                                                price={item.price}
                                                image={item.image}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">No items found</h3>
                                    <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MealMenu;
