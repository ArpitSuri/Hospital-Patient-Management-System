import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-full">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            Dental
          </span>
        </div>
        
        <div className={`hidden md:flex space-x-8 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
          <a href="#home" className="hover:text-blue-600 transition-colors duration-300">HOME</a>
          <a href="#about" className="hover:text-blue-600 transition-colors duration-300">ABOUT</a>
          <a href="#services" className="hover:text-blue-600 transition-colors duration-300">SERVICES</a>
          <a href="#dentists" className="hover:text-blue-600 transition-colors duration-300">DENTISTS</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors duration-300">PRICING</a>
          <div className="relative group">

          </div>
        </div>
        
        <Link to="/appointment" className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
          SCHEDULE A VISIT
        </Link>
      </nav>
    </header>
  );
};

export default Header;