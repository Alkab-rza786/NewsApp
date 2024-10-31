import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/Admin_Assets/upload_area.svg'
import { useState } from 'react'
import { toast } from 'react-toastify'

function AddProduct() {

    const [image, setImage] = useState(false)
    const [productDetails, setProductDetails] = useState({
        headline: "",
        image: "",
        summary: "",
        category: "national",
        type: "latest"

    })

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const addproduct = async () => {
        console.log(productDetails)
        let responseData;
        let product = productDetails;
        let formData = new FormData();

        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data })

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product)
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? toast.success("Product added") : alert('Failed')
            })
        }
    }

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>News Headline</p>
                <input value={productDetails.headline} onChange={changeHandler} type="text" name='headline' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>News Summary</p>
                <textarea rows='10' value={productDetails.summary} onChange={changeHandler} type="text" name='summary' placeholder='Type here' />
            </div>

            <div className='category-divide' >
                <div className="addproduct-itemfield">
                    <p>News Category</p>
                    <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector' >
                        <option value="national">National</option>
                        <option value="global">Global</option>
                        <option value="politics">Politics</option>
                        <option value="technologies">Technologies</option>
                        <option value="sports">Sports</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="entertainmaint">Entertainmaint</option>


                    </select>
                </div>
                <div className="addproduct-itemfield" >
                    <p>News Type</p>
                    <select value={productDetails.type} onChange={changeHandler} name="type" className='add-product-selector'  >
                        <option value="normal">Normal News</option>
                        <option value="top">Tops News</option>
                        <option value="latest">Latest News</option>
                        <option value="india-news">Inida News</option>
                        <option value="home-trending">News for Home Treading section</option>
                        <option value="category-trending">News for category Treading section</option>



                    </select>
                </div>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumbnail-img' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button className='addproduct-btn' onClick={() => { addproduct() }} >Add</button>

        </div>
    )
}

export default AddProduct
