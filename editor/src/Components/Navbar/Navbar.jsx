import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import navlogo from '../../assets/Admin_Assets/Logo.png';
import navProfile from '../../assets/Admin_Assets/nav-profile.svg';

function Navbar() {
    return (
        <div className="navbar flex items-center justify-between p-4 bg-white shadow-md">
            <img src={navlogo} alt="Logo" className="nav-logo h-10" />
            <div className="flex items-center space-x-4">
                <Link to="/login">
                    <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">
                        Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">
                        Sign Up
                    </button>
                </Link>
                <img src={navProfile} className="nav-profile h-10" alt="Profile" />
            </div>
        </div>
    );
}

export default Navbar;
