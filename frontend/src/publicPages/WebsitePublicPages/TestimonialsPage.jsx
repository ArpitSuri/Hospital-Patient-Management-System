import React from 'react';

import { motion } from 'framer-motion';
import Testimonials from './commonents/testimonials';
import Header from './commonents/header';
import Footer from './commonents/footer';

const TestimonialsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Featured testimonials (additional ones for the dedicated page)
  const featuredTestimonials = [
    {
      name: "Dr. Jason Miller",
      role: "Orthodontist",
      text: "As a referring orthodontist, I've sent numerous patients to this dental practice and have always heard glowing reviews. Their attention to detail and commitment to patient care is impressive. The seamless coordination between our practices ensures comprehensive dental care for all referred patients.",
      image: "/api/placeholder/64/64" // Placeholder for profile image
    },
    {
      name: "Emily Richards",
      role: "Teacher",
      text: "I brought my entire family here after years of dental anxiety. The staff was incredibly accommodating, especially with my children. My 7-year-old actually looks forward to dental visits now! Their kid-friendly approach has transformed our family's dental experience.",
      image: "/api/placeholder/64/64" // Placeholder for profile image
    }
  ];

  return (
    <div className="testimonials-page pt-32 pb-16">
      <Header />
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-center mb-6 text-gray-900"
            variants={itemVariants}
          >
            What Our Patients Say
          </motion.h1>
          
          <motion.p 
            className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            We value our patients and their experiences. Here's what they have to say about our dental care and services.
          </motion.p>
        </motion.div>

        {/* Main testimonials component */}
        <Testimonials />
        
        {/* Featured testimonials */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Testimonials</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6 flex-grow">
                    <svg className="w-10 h-10 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                    </svg>
                    <p className="text-lg text-gray-700 italic">{testimonial.text}</p>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Video Testimonials Section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Video Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Video testimonial placeholders */}
            <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md aspect-video relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-medium">Sarah's Smile Transformation</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md aspect-video relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-medium">John's Dental Implant Journey</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Leave a Review Section */}
        <motion.div 
          className="mt-24 max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Share Your Experience</h2>
            <p className="text-lg mb-8 text-center text-white/90">
              We value your feedback! If you've been a patient at our dental practice, we'd love to hear about your experience.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <a 
                href="#" 
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                Write a Review
              </a>
              <a 
                href="#" 
                className="bg-transparent text-white border border-white px-6 py-3 rounded-full font-semibold flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                </svg>
                Review on Google
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;