import React, { useEffect, useState } from "react";
import Loader from './Loader' // Import the Loader component
import { Link } from "react-router-dom";
import ShareButton from "./ShareButton";

const NewsCategory = ({ category }) => {
    const [posts, setPosts] = useState([]);
    const [twoPost, setTwoPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                const response = await fetch('http://localhost:4000/allnewsofcategory');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllNews();
    }, []);

    const fetchProducts = async (category) => {
        try {
            const response = await fetch(`http://localhost:4000/category-two-news/${category}`);
            const data = await response.json();
            setTwoPost(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        if (category) {
            fetchProducts(category);
        }
    }, [category]);

    // If loading, display the Loader component
    if (loading) return <Loader />;

    // If there is an error, display it
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-6">
                {/* Main Content */}
                <div className="md:w-2/3">
                    <div className="border-b-4 border-red-600 mb-4">
                        <h2 className="text-xl font-bold">{category.toUpperCase()}</h2>
                    </div>
                    {twoPost.length > 0 && (
                        <div className="flex gap-4 flex-col sm:flex-row">
                            {twoPost.slice(0, 2).map((post, index) => (
                                <Link to={`/news/${post.id}`} key={index}>
                                    <img src={post.image} alt="Main Post" className="w-full h-5/6 mb-4" loading="lazy" />
                                    <h3 className="text-2xl font-semibold">{post.headline}</h3>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
                    <div className="space-y-4">
                        {posts.filter(post => post.category === category && post.type === "latest").slice(0, 5).map((post, index) => (
                            <Link to={`/news/${post.id}`} key={index} className="flex items-start space-x-4">
                                <img
                                    src={post.image}
                                    alt={post.headline}
                                    className="w-16 h-16 object-cover"
                                    loading="lazy"
                                />
                                <div>
                                    <p className="text-red-600 font-bold">{post.category}</p>
                                    <p className="text-sm font-semibold">{post.headline}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Popular Posts Section */}
            <div className="container mx-auto mt-10 px-10 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Most Popular</h2>
                    <div className="w-full h-[3px] bg-orange-500 rounded mt-1"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                    {posts.filter(post => post.category === category && post.type === "normal").slice(0, 7).map((post, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <img
                                src={post.image}
                                alt="News"
                                className="w-full h-40 object-cover"
                                loading="lazy"
                            />
                            <div className="p-3">
                                <h3 className="font-semibold text-base text-gray-800">{post.headline}</h3>
                                <p className="text-xs text-gray-500 mt-1">{post.category} • {new Date(post.createdAt).toLocaleDateString('en-CA')}</p>
                                <Link to={`/news/${post.id}`} onClick={window.scrollTo(0, 0)} >
                                    <p className="text-sm text-gray-600 mt-2 hover:underline ">{post?.summary ? (post.summary.length > 50 ? `${post.summary.substring(0, 250)}...` : post.summary) : "No summary available"}</p></Link>
                                <div className='flex gap-3'>

                                    <Link to={`/news/${post.id}`} onClick={window.scrollTo(0, 0)} > <button className="bg-orange-500 text-white px-3 py-1 mt-4 text-sm rounded hover:bg-orange-600">Read more</button> </Link>
                                    <ShareButton url={`http://localhost:4000/news/${post.id}`} title={post.headline} />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Articles */}
            <div className="container mx-auto px-14 py-6">
                {posts.filter(post => post.category === category && post.type === "normal").slice(7, 10).map((news, index) => (
                    <Link key={index} className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-4">
                        <div className="md:w-1/3">
                            <img src={news.image} alt={news.headline} className="w-full h-48 md:h-full object-cover" loading="lazy"/>
                        </div>
                        <div className="p-4 md:w-2/3 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{news.headline}</h2>
                                <p className="text-sm text-gray-600">By <span className="font-bold"></span> — {new Date(news.createdAt).toLocaleDateString('en-CA')}</p>
                                <Link to={`/news/${news.id}`}><p className="text-sm text-gray-500 hover:underline">{news.summary}</p>

                                    <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold">Read More</button></Link>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                {news.percentage && (
                                    <div className="relative">
                                        <div className="text-white bg-red-500 rounded-full w-12 h-12 flex items-center justify-center font-bold">{news.percentage}%</div>
                                    </div>
                                )}
                                <div className="flex items-center text-gray-500 text-sm space-x-2">
                                    <ShareButton url={`http://localhost:4000/news/${news.id}`} title={news.headline} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Top and India News Section */}
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-xl font-bold border-b-2 border-green-400 mb-4">TOP NEWS</h2>
                            {posts.filter(article => article.category === category && article.type === "top").slice(0, 8).map((article, index) => (
                                <Link to={`/news/${article.id}`} key={index} className="flex flex-col gap-4 mb-6 border-b pb-4">
                                    <div className="flex gap-4">
                                        <img className="w-24 h-24 object-cover rounded" src={article.image} alt={article.headline} loading="lazy" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{article.headline}</h3>
                                            <div className="text-sm text-gray-500">
                                                <span>{article.category}</span> | <span>{new Date(article.createdAt).toLocaleDateString('en-CA')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="self-start text-white p-2 text-xs cursor-pointer rounded-md bg-black">Read More</button>
                                </Link>
                            ))}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold border-b-2 border-red-400 mb-4">INDIA NEWS</h2>
                            {posts.filter(article => article.category === category && article.type === "india-news").slice(0, 8).map((article, index) => (
                                <Link to={`/news/${article.id}`} key={index} className="flex flex-col gap-4 mb-6 border-b pb-4">
                                    <div className="flex gap-4">
                                        <img className="w-24 h-24 object-cover rounded" loading="lazy" src={article.image} alt={article.headline} />
                                        <div>
                                            <h3 className="text-lg font-semibold">{article.headline}</h3>
                                            <div className="text-sm text-gray-500">
                                                <span>{article.category}</span> | <span>{new Date(article.createdAt).toLocaleDateString('en-CA')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="self-start text-white p-2 text-xs cursor-pointer rounded-md bg-black">Read More</button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsCategory;
