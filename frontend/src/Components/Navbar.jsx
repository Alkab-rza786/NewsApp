import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/Logo.png';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('home'); // State for the active link

    // Function to handle menu item click
    const handleLinkClick = (link) => {
        setActiveLink(link); // Update the active link state
    };

    return (
        <nav className="bg-white shadow-lg sticky-navbar">
            {/* Top Section for Logo and Search */}
            <div className="container mx-auto px-4 flex justify-between items-center py-2 md:py-2">
                {/* Logo */}
                <Link to='/' onClick={() => handleLinkClick('home')} className="flex items-center">
                    <img src={logo} alt="Logo" className='w-48 md:w-64 mb-2 md:mb-0' /> {/* Added margin-bottom for mobile view */}
                </Link>

                {/* Subscription Button */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto">
                    Subscribe
                </button>
            </div>

            {/* Bottom Section for Nav Menu */}
            <div className="bg-white py-2">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-6 overflow-x-auto scrollbar-hide md:justify-center">
                        {['home', 'national', 'global', 'politics', 'technologies', 'sports', 'business', 'health', 'entertainment'].map(link => (
                            <Link 
                                to={`/${link === 'home' ? '' : link}`} 
                                onClick={() => handleLinkClick(link)} 
                                key={link}
                                className={`relative text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors duration-300`}
                            >
                                {link.charAt(0).toUpperCase() + link.slice(1)}
                                {activeLink === link && (
                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 transition-all duration-300"></span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
