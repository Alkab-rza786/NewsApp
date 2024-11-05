import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import navlogo from '../../assets/Admin_Assets/Logo.png';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // Check login status on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username'); // Retrieve username from localStorage
        if (token) {
            setIsLoggedIn(true);
            setUsername(storedUsername || ''); // Set username if available
        }
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        localStorage.removeItem('username'); // Remove the username
        setIsLoggedIn(false);
        setUsername('');
        navigate('/'); // Redirect to the home page or login
    };

    return (
        <div className="navbar flex items-center justify-between p-4 bg-white shadow-md">
            <img src={navlogo} alt="Logo" className="nav-logo h-10" />
            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <>
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200">
                            Logout
                        </button>
                        <span className="text-gray-700 font-semibold">{username.charAt(0).toUpperCase()+username.slice(1)}</span> {/* Display username */}
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
