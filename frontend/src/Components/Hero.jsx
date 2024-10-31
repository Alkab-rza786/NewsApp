import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import ShareButton from './ShareButton';

const NewsComponent = () => {
    const [fourNews, setFourNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);
    const [latest, setLatest] = useState([]);
    const [top, setTop] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [fourNewsResponse, allNewsResponse, latestResponse, topResponse] = await Promise.all([
                    fetch('http://localhost:4000/home-four-news'),
                    fetch('http://localhost:4000/allnews'),
                    fetch('http://localhost:4000/latest'),
                    fetch('http://localhost:4000/top')
                ]);

                if (!fourNewsResponse.ok || !allNewsResponse.ok || !latestResponse.ok || !topResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const [fourNewsData, allNewsData, latestData, topData] = await Promise.all([
                    fourNewsResponse.json(),
                    allNewsResponse.json(),
                    latestResponse.json(),
                    topResponse.json()
                ]);

                setFourNews(fourNewsData);
                setArticles(allNewsData);
                setLatest(latestData);
                setTop(topData);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the combined fetch function
    }, []);

    // Render loading state or error message
    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="container mx-auto p-4 max-w-screen-xl">
                {/* Trending Now Bar */}
                <div className="flex flex-wrap items-center mb-4 space-x-4">
                    <span className="bg-black text-white px-3 py-1 text-sm uppercase">Trending Now</span>
                    <p className="text-gray-600 text-sm"> dfjk</p>
                </div>

                {/* Main Content Grid */}
                {fourNews.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Left Large Image */}
                        <div className="relative md:col-span-2">
                            <img
                                src={fourNews[0].image}
                                alt="Featured"
                                className="w-full h-full object-cover max-h-[300px] sm:max-h-[400px]"
                            />
                            <div className="absolute bottom-4 left-4 bg-opacity-60 p-4 rounded-md text-white">
                                <span className="bg-blue-600 px-3 py-1 text-xs uppercase">{fourNews[0].category}</span>
                                <Link to={`/news/${fourNews[0].id}`} onClick={window.scrollTo(0, 0)} ><h2 className="mt-2 text-lg sm:text-xl font-bold hover:underline">
                                    {fourNews[0].headline}
                                </h2>
                                </Link>
                                <p className="mt-1 text-xs sm:text-sm">
                                    {new Date(fourNews[0].createdAt).toLocaleDateString('en-CA')}
                                </p>
                                <ShareButton url={`http://localhost:4000/news/${fourNews[0].id}`} title={fourNews[0].headline} />
                            </div>
                        </div>

                        {/* Right Small Images Grid */}
                        <Link className="grid grid-rows-2 gap-4">
                            <Link to={`/news/${fourNews[1].id}`} onClick={window.scrollTo(0, 0)} className="relative">
                                <img
                                    src={fourNews[1].image}
                                    alt="Gadget"
                                    className="w-full h-full object-cover max-h-[150px] sm:max-h-[200px]"
                                />
                                <div className="absolute bottom-4 left-4 bg-opacity-60 p-4 rounded-md text-white">
                                    <span className="bg-green-600 px-3 py-1 text-xs uppercase">{fourNews[1].category}</span>
                                    <h3 className="mt-2 text-sm sm:text-lg font-semibold"> {fourNews[1].headline}</h3>
                                </div>
                            </Link>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Travel Image */}
                                <Link to={`/news/${fourNews[2].id}`} onClick={window.scrollTo(0, 0)} className="relative">
                                    <img
                                        src={fourNews[2].image}
                                        alt="Travel"
                                        className="w-full h-full object-cover min-h-[180px] sm:max-h-[150px]"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-opacity-60 p-2 rounded-md text-white">
                                        <span className="bg-pink-600 px-2 py-1 text-xs uppercase">{fourNews[2].category}</span>
                                        <h4 className="mt-1 text-xs sm:text-sm">{fourNews[2].headline}</h4>
                                    </div>
                                </Link>

                                {/* Reviews Image */}
                                <Link to={`/news/${fourNews[3].id}`} onClick={window.scrollTo(0, 0)} className="relative">
                                    <img
                                        src={fourNews[3].image}
                                        alt="Reviews"
                                        className="w-full h-full object-cover min-h-[180px] sm:max-h-[150px]"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-opacity-60 p-2 rounded-md text-white">
                                        <span className="bg-yellow-600 px-2 py-1 text-xs uppercase">{fourNews[3].category}</span>
                                        <h4 className="mt-1 text-xs sm:text-sm">{fourNews[3].headline}</h4>
                                    </div>
                                </Link>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <p>No news available.</p> // Fallback if no news is available
                )}
            </div>

            {/* Most Popular Section */}
            <div className="container mx-auto px-10 py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Most Popular</h2>
                    <div className="w-full h-[3px] bg-orange-500 rounded mt-1"></div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            className="bg-white  shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={article.image}
                                alt="News"
                                className="w-full h-40 object-cover   "
                            />

                            <div className="p-3 ">
                                <h3 className="font-semibold text-base text-gray-800">{article.headline}</h3>
                                <p className="text-xs text-gray-500 mt-1">{article.category} • {new Date(article.createdAt).toLocaleDateString('en-CA')}</p>
                                <Link to={`/news/${article.id}`} onClick={window.scrollTo(0, 0)}  ><p className="text-sm text-gray-600 mt-2 hover:underline">
                                    {article?.summary ? (article.summary.length > 50 ? `${article.summary.substring(0, 250)}...` : article.summary) : "No summary available"}
                                </p></Link>
                                <div className='flex gap-3'>
                                    <Link to={`/news/${article.id}`} onClick={window.scrollTo(0, 0)}><button className="bg-orange-500 text-white px-3 py-1 mt-4 text-sm rounded hover:bg-orange-600">
                                        Read more
                                    </button></Link>
                                    <ShareButton url={`http://localhost:4000/news/${article.id}`} title={article.headline} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Latest and Top News Section */}
            <div className="min-h-screen flex items-center justify-center">
                {/* Container */}
                <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
                    {/* Grid Layout */}
                    <div className="grid md:grid-cols-2 gap-16">

                        {/* Latest News Section */}
                        <div>
                            <h2 className="text-xl font-bold border-b-2 border-green-400 mb-4">LATEST NEWS</h2>
                            {latest.map((article, index) => (
                                <Link to={`/news/${article.id}`} onClick={window.scrollTo(0, 0)} key={index} className="flex flex-col gap-4 mb-6 border-b pb-4 cursor-pointer">
                                    <div className="flex gap-4">
                                        <img className="w-24 h-24 object-cover rounded" src={article.image} alt={article.headline} />
                                        <div>
                                            <h3 className="text-lg font-semibold">{article.headline}</h3>
                                            <div className="text-sm text-gray-500">
                                                <span>{article.category}</span> <span>{new Date(article.createdAt).toLocaleDateString('en-CA')}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{article.summary.substring(0, 100)}...</p>
                                        </div>
                                    </div>


                                </Link>
                            ))}
                        </div>

                        {/* Top News Section */}
                        <div>
                            <h2 className="text-xl font-bold border-b-2 border-blue-400 mb-4">TOP NEWS</h2>
                            {top.map((article, index) => (
                                <Link to={`/news/${article.id}`} onClick={window.scrollTo(0, 0)} key={index} className="flex flex-col gap-4 mb-6 border-b pb-4 cursor-pointer">
                                    <div className="flex gap-4">
                                        <img className="w-24 h-24 object-cover rounded" src={article.image} alt={article.headline} />
                                        <div>
                                            <h3 className="text-lg font-semibold">{article.headline}</h3>
                                            <div className="text-sm text-gray-500">
                                                <span>{article.category}</span> <span>{new Date(article.createdAt).toLocaleDateString('en-CA')}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{article.summary.substring(0, 100)}...</p>
                                        </div>
                                    </div>

                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsComponent;
