import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {/* Company Info */}
                <div className="text-center sm:text-left">
                    <h4 className="text-2xl font-bold mb-4">About Us</h4>
                    <p className="text-sm leading-relaxed text-gray-300">
                        We are a leading news platform, bringing you the latest in fashion, gadgets, travel, and more. Stay informed with our reliable news.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center sm:text-left">
                    <h4 className="text-2xl font-bold mb-4">Quick Links</h4>
                    <ul>
                        {['Home', 'Trending', 'Fashion', 'Travel', 'Gadgets'].map((link, index) => (
                            <li key={index} className="mb-2">
                                <a href={`#${link.toLowerCase()}`} className="text-sm text-gray-400 hover:text-blue-500 transition duration-300">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media */}
                <div className="text-center sm:text-left">
                    <h4 className="text-2xl font-bold mb-4">Follow Us</h4>
                    <div className="flex gap-4  md:flex-col sm:justify-start flex-col justify-center ">
                        {/* Facebook */}
                        <a href="#facebook" className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.012 3.664 9.167 8.437 9.878v-6.988h-2.54v-2.89h2.54V9.885c0-2.5 1.492-3.89 3.772-3.89 1.093 0 2.236.196 2.236.196v2.462h-1.26c-1.242 0-1.63.771-1.63 1.56v1.871h2.774l-.443 2.89h-2.331v6.988C18.336 21.167 22 17.012 22 12z" />
                            </svg>
                            <span className="text-sm">Facebook</span>
                        </a>
                        {/* Twitter */}
                        <a href="#twitter" className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M19.633 7.997c.013.178.013.356.013.534 0 5.446-4.145 11.719-11.719 11.719-2.332 0-4.504-.685-6.327-1.866.33.038.654.051.99.051a8.27 8.27 0 0 0 5.12-1.76 4.148 4.148 0 0 1-3.872-2.875c.256.038.506.051.778.051.373 0 .747-.051 1.095-.14A4.139 4.139 0 0 1 2.6 9.714v-.051a4.16 4.16 0 0 0 1.868.521 4.136 4.136 0 0 1-1.85-3.451c0-.747.204-1.447.559-2.052a11.75 11.75 0 0 0 8.51 4.317 4.678 4.678 0 0 1-.102-.949A4.14 4.14 0 0 1 19.633 7.1a8.288 8.288 0 0 0 2.62-.998 4.136 4.136 0 0 1-1.817 2.283 8.285 8.285 0 0 0 2.384-.654 8.948 8.948 0 0 1-2.187 2.262z" />
                            </svg>
                            <span className="text-sm">Twitter</span>
                        </a>
                        {/* Instagram */}
                        <a href="#instagram" className="flex items-center space-x-2 text-gray-400 hover:text-pink-500 transition duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.058 1.968.25 2.43.415a4.615 4.615 0 0 1 1.674.992c.499.5.812 1.114.992 1.674.165.462.357 1.224.415 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.206-.25 1.968-.415 2.43a4.615 4.615 0 0 1-.992 1.674 4.615 4.615 0 0 1-1.674.992c-.462.165-1.224.357-2.43.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.058-1.968-.25-2.43-.415a4.615 4.615 0 0 1-1.674-.992 4.615 4.615 0 0 1-.992-1.674c-.165-.462-.357-1.224-.415-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.206.25-1.968.415-2.43a4.615 4.615 0 0 1 .992-1.674 4.615 4.615 0 0 1 1.674-.992c.462-.165 1.224-.357 2.43-.415C8.416 2.175 8.796 2.163 12 2.163M12 0C8.736 0 8.332.014 7.053.072 5.769.13 4.799.337 4.042.636c-.86.33-1.61.77-2.367 1.527a6.551 6.551 0 0 0-1.527 2.367C.337 5.2.13 6.17.072 7.453.014 8.732 0 9.134 0 12s.014 3.268.072 4.547c.058 1.284.265 2.254.636 3.011a6.551 6.551 0 0 0 1.527 2.367c.757.757 1.507 1.197 2.367 1.527.757.371 1.727.578 3.011.636C8.332 23.986 8.736 24 12 24s3.268-.014 4.547-.072c1.284-.058 2.254-.265 3.011-.636a6.551 6.551 0 0 0 2.367-1.527 6.551 6.551 0 0 0 1.527-2.367c.371-.757.578-1.727.636-3.011C23.986 15.268 24 14.866 24 12s-.014-3.268-.072-4.547c-.058-1.284-.265-2.254-.636-3.011a6.551 6.551 0 0 0-1.527-2.367 6.551 6.551 0 0 0-2.367-1.527c-.757-.371-1.727-.578-3.011-.636C15.268.014 14.866 0 12 0zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.168 6.168 0 0 0 12 5.838zm0 10.143A3.981 3.981 0 1 1 15.981 12 3.987 3.987 0 0 1 12 15.981zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
                            </svg>
                            <span className="text-sm">Instagram</span>
                        </a>
                        {/* YouTube */}
                        <a href="#youtube" className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M21.8 8.001c-.17-.65-.678-1.16-1.33-1.331C18.478 6.333 12 6.333 12 6.333s-6.478 0-8.47.338c-.65.171-1.16.68-1.33 1.33-.334 1.99-.334 6.193-.334 6.193s0 4.203.334 6.193c.17.65.678 1.16 1.33 1.331 1.992.338 8.47.338 8.47.338s6.478 0 8.47-.338c.65-.171 1.16-.68 1.33-1.33.334-1.99.334-6.193.334-6.193s0-4.203-.334-6.193zM9.75 15.235V8.765L15.333 12 9.75 15.235z" />
                            </svg>
                            <span className="text-sm">YouTube</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
                <p>&copy; 2024 Your News Website. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
