import React from "react";
import { FaWhatsapp, FaTwitter, FaFacebookF } from "react-icons/fa";

const ShareButton = ({ url, title, image }) => {
  const shareText = encodeURIComponent(`${title} - ${url}`);
  const shareImage = encodeURIComponent(image);

  return (
    <div className="flex gap-2 mt-4">
      {/* WhatsApp Share */}
      <a
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center"
      >
        <FaWhatsapp size={20} />
      </a>

      {/* Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
      >
        <FaTwitter size={20} />
      </a>

      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800 flex items-center justify-center"
      >
        <FaFacebookF size={20} />
      </a>
    </div>
  );
};

export default ShareButton;
