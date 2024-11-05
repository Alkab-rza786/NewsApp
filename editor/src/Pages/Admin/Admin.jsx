import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import ListProduct from '../../Components/ListProduct/ListProduct'
import AddProduct from '../../components/AddProduct/AddProduct'


function Admin() {
    return (
        <div className='admin'>
            <Sidebar />
           
            <Routes>
                <Route path='/addproduct' element={<AddProduct />} ></Route>
                <Route path='/listproduct' element={<ListProduct />} ></Route>
            </Routes>
        </div>
    )
}

export default Admin
