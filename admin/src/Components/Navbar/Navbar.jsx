import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/Admin_Assets/Logo.png'
import navProfile from '../../assets/Admin_Assets/nav-profile.svg'

function Navbar() {
    return (
        <div className='navbar'>
            <img src={navlogo} alt="" className="nav-logo" />
            <img src={navProfile} className='nav-profile' alt="" />
        </div>
    )
}

export default Navbar
