import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import ShareButton from './ShareButton';

const NewsCard = () => {
    const [newses, setAllnews] = useState([]);
    const [categoryLatest, setCategoryLatest] = useState([]);
    const { newsId } = useParams();

    // Fetch all news data
    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setAllnews(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Optionally set an error state here to show to the user
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    // Find the specific news by ID
    const news = newses.find((e) => e.id === Number(newsId));
    console.log(news);
    // console.log(object)

    return (
        <div className="flex flex-col lg:flex-row max-w-screen-lg mx-auto p-4 gap-6">
            {/* Main Content Area */}
            {news ? ( // Only render if `news` is available
                <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">{news.headline}</h2>
                    <p className="text-gray-500 text-sm mb-4">
                        Published At: {new Date(news.createdAt).toLocaleDateString('en-CA')}
                    </p>
                    <div
                        className="w-full h-64 object-cover bg-cover bg-center rounded-lg mb-4"
                        style={{ backgroundImage: `url(${news.image})` }}
                    ></div>
                    <p className="text-gray-800 mb-4">{news.summary}</p>
                    <br /><p>This is extra para <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam iste distinctio fugit harum officia iure voluptates, perferendis, at hic in corrupti. Sunt, porro? Modi, assumenda molestias. Aut tenetur a ut officiis? Maxime pariatur animi illo ipsa asperiores accusantium laborum saepe ipsam aperiam tempora praesentium voluptatum soluta eum exercitationem fugiat ipsum dicta, odio possimus tempore eaque quas incidunt recusandae dolor. Excepturi unde vero ducimus! Reiciendis illum facilis deserunt dolor eius. Ipsum ab voluptate aliquam tempora deserunt quo voluptas! Quis error a sequi non quos temporibus odio, odit, eos sapiente qui, quibusdam perferendis quia unde quo? Fugit saepe magni labore iure in.</p>
                    <div className='flex justify-between mt-4'>
                        <div className="text-sm text-gray-500">
                            <span><b>Date :</b> {new Date(news.createdAt).toLocaleDateString('en-CA', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}</span><br /> <span><b>Edited By :</b> Alkab Rza</span>
                        </div>
                        <ShareButton url={`http://localhost:3000/news/${news.id}`} title={news.headline} image={news.image} />

                    </div>

                </div>
            ) : (
                <Loader /> // Loading state for better UX
            )}

            {/* Sidebar for Latest News */}
            <div className="w-full lg:w-1/3">
                <h3 className="text-xl font-semibold mb-4">Latest News</h3>
                <ul className="space-y-4">
                    {news && newses
                        .filter(latestNews => latestNews.category === news.category && latestNews.type === "latest")
                        .slice(0, 8)
                        .map((latestNews, index) => (
                            <Link to={`/news/${latestNews.id}`} key={index} className="bg-white p-4 rounded-lg shadow flex gap-4 items-center">
                                <img src={latestNews.image} alt="" className='w-28 h-22 rounded-md' /> {/* Use latestNews.image */}
                                <span className="text-gray-700 text-sm">
                                    {latestNews.headline.length > 60
                                        ? `${latestNews.headline.substring(0, 60)}...`
                                        : latestNews.headline}
                                </span>
                            </Link>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default NewsCard;
