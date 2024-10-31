import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

const ShareButton = ({ url, title }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        console.log('Share was successful!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert(`Share this link: ${url}`);
    }
  };

  return (
    <button
      onClick={handleShare}
      className=" flex bg-orange-500 text-white px-3 py-1 mt-4 text-sm rounded hover:bg-orange-600"
    >
      <FaShareAlt className="mr-2" />
      Share
    </button>
  );
};

export default ShareButton;
