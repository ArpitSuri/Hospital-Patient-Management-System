import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navigate = useNavigate();
  const MotionLink = motion(Link);
  
  // Create a smooth background blur effect
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { href: "#home", label: "HOME" },
    { href: "#about", label: "ABOUT" },
    { href: "#service", label: "SERVICES" },
    { href: "#dentists", label: "DENTISTS" },
  ];

  return (
    <motion.header 
      className="fixed top-0 w-full z-50"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* Animated background with blur effect */}
      <motion.div
        className="absolute inset-0 bg-white"
        style={{
          opacity: backgroundOpacity,
          backdropFilter: useTransform(backdropBlur, (value) => `blur(${value}px)`)
        }}
      />
      
      {/* Gradient overlay for smooth transition */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"
        animate={{
          opacity: isScrolled ? 0 : 1
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
          <span className={`text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}>
            Dental
          </span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div className="hidden lg:flex items-center">
          {/* Navigation Menu Background */}
          <motion.div
            className={`rounded-full px-8 py-3 backdrop-blur-md transition-all duration-300 ${
              isScrolled 
                ? 'bg-gray-50/80 shadow-md border border-gray-200' 
                : 'bg-white/10 border border-white/20'
            }`}
            layout
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <div className={`flex space-x-8 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="relative text-sm font-medium transition-colors duration-300 group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <span className="relative z-10 group-hover:text-blue-600 transition-colors duration-300">
                    {item.label}
                  </span>
                  {/* Underline animation */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.a>
              ))}
              
              {/* All Pages Dropdown */}
              {/* <motion.div 
                className="relative group"
                variants={itemVariants}
              >
                <a 
                  href="#" 
                  className="relative text-sm font-medium group-hover:text-blue-600 transition-colors duration-300 flex items-center"
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
                </a>
              </motion.div> */}
            </div>
          </motion.div>
        </motion.div>
        
        {/* CTA Button */}
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
          <span className="relative z-10" onClick={()=>{
            navigate('/appointment');
          }}>SCHEDULE A VISIT</span>
          
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

        {/* Mobile Menu Button */}
        <motion.button
          className={`lg:hidden p-2 rounded-lg ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}
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
          {menuItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="block py-3 text-gray-900 hover:text-blue-600 transition-colors duration-300"
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.div variants={itemVariants}>
            <MotionLink
              to="/appointment"
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-semibold text-center block"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SCHEDULE A VISIT
            </MotionLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Header;