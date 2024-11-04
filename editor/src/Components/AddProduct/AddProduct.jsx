import React, { useEffect, useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/Admin_Assets/upload_area.svg';
import { toast } from 'react-toastify';

function AddProduct() {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        headline: "",
        image: "",
        summary: "",
        editor: "",
        category: "national",
        type: "latest",
        status: false,
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true); // User is logged in
        } else {
            setIsLoggedIn(false); // User is not logged in
        }
    }, []);

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

   const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = { ...productDetails, status: false }; // Ensure status is set to false
    let formData = new FormData();

    formData.append('product', image);

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`, // Add token here
        },
        body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/editorAddproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add token here
            },
            body: JSON.stringify(product),
        }).then((resp) => resp.json()).then((data) => {
            data.success ? toast.success("Product added") : alert('Failed');
        });
    }
};

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>News Headline</p>
                <input value={productDetails.headline} onChange={changeHandler} type="text" name='headline' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Editor Name</p>
                <input value={productDetails.editor} onChange={changeHandler} type="text" name='editor' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>News Summary</p>
                <textarea rows='10' value={productDetails.summary} onChange={changeHandler} name='summary' placeholder='Type here' />
            </div>

            <div className='category-divide'>
                <div className="addproduct-itemfield">
                    <p>News Category</p>
                    <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                        <option value="national">National</option>
                        <option value="global">Global</option>
                        <option value="politics">Politics</option>
                        <option value="technologies">Technologies</option>
                        <option value="sports">Sports</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>
                <div className="addproduct-itemfield">
                    <p>News Type</p>
                    <select value={productDetails.type} onChange={changeHandler} name="type" className='add-product-selector'>
                        <option value="normal">Normal News</option>
                        <option value="top">Top News</option>
                        <option value="latest">Latest News</option>
                        <option value="india-news">India News</option>
                    </select>
                </div>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumbnail-img' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            {isLoggedIn ? (
                <button className='addproduct-btn' onClick={addProduct}>Add</button>
            ) : (
                <p className="text-red-500">You must be logged in to add a product.</p>
            )}
        </div>
    );
}

export default AddProduct;
