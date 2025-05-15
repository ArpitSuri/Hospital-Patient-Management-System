import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 1
      }
    }
  };

  const titleVariants = {
    hidden: { 
      y: 80, 
      opacity: 0,
      skewY: 5
    },
    visible: {
      y: 0,
      opacity: 1,
      skewY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25,
        mass: 1.1,
        duration: 1
      }
    }
  };

  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 0 0 rgba(59, 130, 246, 0)"
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const services = [
    'Preventive Care', 
    'Oral Surgery', 
    'Emergency Care', 
    'Orthodontics', 
    'Cosmetic Dentistry', 
    'Dental Repair'
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with fallback */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Video element with proper source and fallbacks */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/dental-hero-poster.jpg" // Add a poster frame
        >
          {/* Multiple video sources for better browser compatibility */}
          <source src="/4490311-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          {/* <source src="/videos/dental-hero.webm" type="video/webm" /> */}
          
          {/* Fallback content if video doesn't load */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
            <p className="text-white text-lg">Your browser doesn't support HTML5 video</p>
          </div>
        </video>
        
        {/* Gradient overlays for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Main content container */}
      <motion.div 
        className="relative z-10 text-white px-6 w-full max-w-6xl mx-auto text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main title with split animation */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          variants={titleVariants}
        >
          <motion.span className="block" variants={itemVariants}>
            Exceptional
          </motion.span>
          <motion.span 
            className="block font-medium text-blue-300"
            variants={itemVariants}
            custom={1} // Custom delay for this element
          >
            dental care.
          </motion.span>
        </motion.h1>
        
        {/* Description text */}
        <motion.p 
          className="text-lg md:text-xl mb-8 max-w-lg leading-relaxed"
          variants={itemVariants}
          custom={1.2} // Custom delay
        >
          Our team is committed to delivering top-quality, compassionate treatments in a comfortable environment.
        </motion.p>
        
        {/* CTA button with enhanced hover effects */}
        <motion.div variants={itemVariants} custom={1.4}>
          <motion.button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium relative overflow-hidden group"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <span className="relative z-10 flex items-center" onClick={() => window.location.href = '/appointment'}>
              BOOK NOW
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            
            {/* Button hover effect */}
            <motion.span 
              className="absolute inset-0 bg-blue-700 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.3 }
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
      
    
      
      {/* Testimonials/Why Choose Us - right side */}
      <motion.div 
        className="absolute bottom-32 right-6 text-white text-right hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold mb-3">Why Choose Us?</h3>
        <div className="flex justify-end space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.5 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-blue-300">⭐</span>
            </motion.div>
          ))}
        </div>
        <p className="text-base max-w-sm">
          Whether you're visiting for a routine check-up or a more advanced procedure, we ensure your oral health is in the best hands, helping you achieve a confident, healthy smile.
        </p>
      </motion.div>
      
      {/* Mobile-friendly services section */}
      <motion.div 
        className="lg:hidden absolute bottom-20 left-0 right-0 px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-lg">
          <h4 className="text-white text-xl font-semibold mb-3">Our Services</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {services.slice(0, 4).map((service) => (
              <div key={service} className="text-sm border border-white/30 rounded-full px-3 py-2 text-center">
                {service}
              </div>
            ))}
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition-colors">
            View All Services
          </button>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;