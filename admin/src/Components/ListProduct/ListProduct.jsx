import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/Admin_Assets/cross_icon.png'
import { toast } from 'react-toastify'

function ListProduct() {

    const [allproducts, setAllproducts] = useState([])
    const [search, SetSearch] = useState("All")
    const [type, setType] = useState("All")
    // const [query, setQuery] = useState("");


    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => {
            setAllproducts(data)
        })
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
        toast.success("Product Removed")
        await fetchInfo();
    }

    return (
        <div className='list-product'>
         
            <h1 className='mt-5 mb-5'>All News  List</h1>

            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Category</p>
                <p>Type</p>
                <p>Remove</p>

            </div>
            <div className="listproduct-allproducts">
                <hr />
                {
                    allproducts.filter(product => product.category === search && product.type === type || search === "All").map((product, i) => {
                        return <><div className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt="" className="listproduct-product-icon" />
                            <p className='listproduct-title' >{product.headline}</p>
                            <p>{product.category}</p>
                            <p>{product.type}</p>

                            <img onClick={() => remove_product(product.id)} src={cross_icon} className='listproduct-remove-icon' alt="" />
                        </div>
                            <hr /></>
                    })
                }
            </div>
        </div>
    )
}

export default ListProduct
