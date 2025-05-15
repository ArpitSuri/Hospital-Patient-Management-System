import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  
  // Create a smooth background blur effect
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 12]);
  const blurEffect = useTransform(backdropBlur, (value) => `blur(${value}px)`);

  // Check if we're on the homepage
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const menuItems = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/services", label: "SERVICES" },
    { to: "/dentists", label: "DENTISTS" },
    { to: "/testimonials", label: "TESTIMONIALS" },
  ];

  // Determine text color based on scroll position and current page
  const textColor = (isScrolled || !isHomepage) ? 'text-gray-900' : 'text-white';
  const headerBg = (isScrolled || !isHomepage) ? 'bg-white/95' : 'bg-transparent';

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 ${headerBg}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* Animated background with blur effect */}
      <motion.div
        className={`absolute inset-0 ${isHomepage ? 'bg-white' : 'hidden'}`}
        style={{
          opacity: isHomepage ? backgroundOpacity : 0,
          backdropFilter: isHomepage ? blurEffect : 'none'
        }}
      />
      
      {/* Gradient overlay for smooth transition */}
      <motion.div
        className={`absolute inset-0 ${isHomepage ? 'bg-gradient-to-b from-black/10 to-transparent' : 'hidden'}`}
        animate={{
          opacity: isScrolled ? 0 : isHomepage ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.nav 
        className={`container mx-auto px-4 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Link to="/">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg relative overflow-hidden"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              {/* Shimmer effect on logo */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{
                  x: "100%",
                  transition: { duration: 0.6 }
                }}
              />
              <svg className="w-8 h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </motion.div>
          </Link>
          <Link to="/" className={`text-2xl font-bold transition-colors duration-300 ${textColor}`}>
            Dental
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div className="hidden lg:flex items-center">
          {/* Navigation Menu Background */}
          <motion.div
            className={`rounded-full px-8 py-3 backdrop-blur-md transition-all duration-300 ${
              isScrolled || !isHomepage
                ? 'bg-gray-50/80' 
                : 'bg-white/10 '
            }`}
            layout
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <div className={`flex space-x-8 ${textColor}`}>
              {menuItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="relative text-sm font-medium transition-colors duration-300 group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link 
                    to={item.to}
                    className={`relative z-10 group-hover:text-blue-600 transition-colors duration-300 ${
                      location.pathname === item.to ? 'text-blue-600' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                  {/* Underline animation */}
                  <motion.div
                    className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 ${
                      location.pathname === item.to ? 'w-full' : 'w-0'
                    }`}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.div>
              ))}
              
              {/* All Pages Dropdown */}
              {/* <motion.div 
                className="relative group"
                variants={itemVariants}
              >
                <div 
                  className="relative text-sm font-medium group-hover:text-blue-600 transition-colors duration-300 flex items-center cursor-pointer"
                >
                  ALL PAGES
                  <motion.svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
                
       
                <motion.div 
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 hidden group-hover:block"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/teeth-whitening" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Teeth Whitening
                  </Link>
                  <Link to="/testimonials" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Testimonials
                  </Link>
                  <Link to="/book-appointment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Book Appointment
                  </Link>
                </motion.div>
              </motion.div> */}
            </div>
          </motion.div>
        </motion.div>
        
        {/* CTA Button */}
        <Link to="/appointment">
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-semibold relative overflow-hidden group shadow-lg"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className="relative z-10">SCHEDULE A VISIT</span>
            
            {/* Button hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.3 }
              }}
              style={{ borderRadius: "inherit" }}
            />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              whileTap={{
                scale: 1.2,
                opacity: 0,
                transition: { duration: 0.3 }
              }}
            />
          </motion.button>
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          className={`lg:hidden p-2 rounded-lg ${textColor}`}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div 
          className="container mx-auto px-4 py-6"
          variants={containerVariants}
          initial="hidden"
          animate={isMobileMenuOpen ? "visible" : "hidden"}
        >
          {menuItems.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <Link
                to={item.to}
                className={`block py-3 hover:text-blue-600 transition-colors duration-300 ${
                  location.pathname === item.to ? 'text-blue-600' : 'text-gray-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <Link to="/appointment" className="block py-3 text-gray-900 hover:text-blue-600 transition-colors duration-300">
              <motion.button 
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-semibold"
                whileTap={{ scale: 0.95 }}
              >
                SCHEDULE A VISIT
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Header;