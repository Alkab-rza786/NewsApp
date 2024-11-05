import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/Admin_Assets/cross_icon.png';
import { toast } from 'react-toastify';

function ListReqProduct() {
    const [allproducts, setAllproducts] = useState([]);
    const [search, SetSearch] = useState("All");
    const [type, setType] = useState("All");

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/editorAllposts')
            .then((res) => res.json())
            .then((data) => {
                setAllproducts(Array.isArray(data) ? data : []);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        });
        toast.success("Product Removed");
        await fetchInfo();
    };

    const updatePostStatus = async (id, newStatus) => {
        await fetch(`http://localhost:4000/updatePostStatus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success(data.message);
                    fetchInfo(); // Refresh the product list after update
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Error updating post status:", error);
                toast.error("Failed to update status");
            });


    };

    const acceptAndMovePost = async (id) => {
        await fetch(`http://localhost:4000/acceptPostAndMove/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success(data.message);
                    fetchInfo(); // Refresh the product list after the update
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Error processing post:", error);
                toast.error("Failed to process post");
            });
    };


    return (
        <div className='list-product'>
            <h1 className='mt-5 mb-5'>All Request News List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>

                <p>Status</p>
                <p>Editor name</p>
                <p>Permission</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {
                    allproducts.filter(product => product.category === search && product.type === type || search === "All").map((product, i) => {
                        return (
                            <div key={i} className="listproduct-format-main listproduct-format">
                                <img src={product.image} alt="" className="listproduct-product-icon" />
                                <p>{product.headline}</p>

                                <p className='text-red-300'>{product.status}</p>
                                <p>{product.userId?.username || 'Unknown User'}</p>
                                <div>
                                    <button onClick={() => acceptAndMovePost(product._id,'accepted')} className="status-button accepted">Accept</button>
                                    <button onClick={() => updatePostStatus(product._id, 'pending')} className="status-button pending">Pending</button>
                                    <button onClick={() => updatePostStatus(product._id, 'rejected')} className="status-button rejected">Reject</button>
                                </div>

                                <img onClick={() => remove_product(product.id)} src={cross_icon} className='listproduct-remove-icon' alt="" />
                                <hr />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ListReqProduct;
