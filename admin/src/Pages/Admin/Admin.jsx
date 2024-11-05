import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import ListReqProduct from '../../Components/ListReqProduct/ListReqProduct'


function Admin() {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<AddProduct />} ></Route>
                <Route path='/listproduct' element={<ListProduct />} ></Route>
                <Route path='/reqListproduct' element={<ListReqProduct />} ></Route>
            </Routes>
        </div>
    )
}

export default Admin
