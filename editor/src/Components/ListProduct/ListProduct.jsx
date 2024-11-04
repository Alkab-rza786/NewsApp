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
        try {
            const response = await fetch('http://localhost:4000/myProducts', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in headers
                    'Content-Type': 'application/json', // Set the content type
                },
            });
    
            if (!response.ok) {
                // If the response is not ok, throw an error
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
    
            // Log the fetched data for debugging
            console.log('Fetched Products:', data);
    
            // Check if data is an array before setting it
            if (Array.isArray(data)) {
                setAllproducts(data);
            } else {
                console.error('Expected an array but got:', data);
                setAllproducts([]); // Fallback to an empty array if not an array
            }
        } catch (error) {
            // Log any errors that occur during the fetch
            console.error('Error fetching products:', error);
            setAllproducts([]); // Set to empty array on error
        }
    };
    

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/editorRemoveproduct', {
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
                <p>status</p>
                <p>Remove</p>

            </div>
            <div className="listproduct-allproducts">
                <hr />
                {
                    allproducts.map((product, i) => {
                        return <><div className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt="" className="listproduct-product-icon" />
                            <p>{product.headline}</p>
                            <p>{product.category}</p>
                            <p>{product.type}</p>
                            <p>{product.status === true ? "Accepted" : "Pending"}</p>

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
