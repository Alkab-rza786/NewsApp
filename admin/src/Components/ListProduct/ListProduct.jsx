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
            <div className="flex items-center space-x-2 w-full md:w-auto">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    Select here for the serach the news and delete the news
                </div>
                <select
                    value={search}
                    onChange={(e) => SetSearch(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 md:w-auto"
                >
                    <option value="All" >
                        All
                    </option>
                    {/* Add options here */}
                    <option value="national">National</option>
                    <option value="global">Global</option>
                    <option value="politics">Politics</option>
                    <option value="technologies">Technologies</option>
                    <option value="sports">Sports</option>
                    <option value="business">Business</option>
                    <option value="health">Health</option>
                    <option value="entertainmaint">Entertainmaint</option>
                </select>

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 md:w-auto"
                >
                    <option value="All" >
                        All
                    </option>
                    {/* Add options here */}
                
                    <option value="normal">Normal News</option>
                    <option value="top">Tops News</option>
                    <option value="latest">Latest News</option>
                    <option value="india-news">Inida News</option>
                    <option value="home-trending">News for Home Treading section</option>
                    <option value="category-trending">News for category Treading section</option>

                </select>
            </div>

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
                            <p>{product.headline}</p>
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
