import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Admin_Assets/Product_Cart.svg'
import list_product_icon from '../../assets/Admin_Assets/Product_list_icon.svg'

function Sidebar() {
    return (
        <div className='sidebar'>
            <Link to={'/editor/addproduct'} style={{ textDecoration: "none" }} >
                <div className="sidebar-item  p-5">
                    <img src={add_product_icon} alt="" />
                    <p>Add News</p>
                    {/* <p>Add Product</p> */}
                </div>
            </Link>
            <Link to={'/editor/listproduct'} style={{ textDecoration: "none" }} >
                <div className="sidebar-item p-5">
                    <img src={list_product_icon} alt="" />
                    {/* <p>Product List</p> */}
                    <p>News List</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar
