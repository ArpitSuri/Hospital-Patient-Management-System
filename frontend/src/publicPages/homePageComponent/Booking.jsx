import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BookVisit = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formState);
    // Could add animation for successful submission
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  const inputVariants = {
    focus: { 
      scale: 1.01,
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.15)",
      borderColor: "#4F46E5",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20
      }
    }
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -mr-48 -mt-48 opacity-40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100 to-sky-100 rounded-full -ml-32 -mb-32 opacity-40 blur-3xl"></div>
      
      {/* Floating circles */}
      <motion.div 
        className="absolute w-8 h-8 bg-indigo-500 rounded-full opacity-10"
        initial={{ x: -100, y: -100 }}
        animate={{ 
          x: ["-10vw", "10vw", "-10vw"],
          y: ["10vh", "30vh", "10vh"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute w-6 h-6 bg-purple-500 rounded-full opacity-10 right-20 top-40"
        initial={{ x: 100, y: 100 }}
        animate={{ 
          x: ["5vw", "-5vw", "5vw"],
          y: ["15vh", "25vh", "15vh"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-indigo-600 font-semibold uppercase tracking-wider mb-2"
          >
            Schedule Your Visit
          </motion.p>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            BOOK A VISIT
          </motion.h2>
          
          <motion.h3 
            variants={itemVariants}
            className="text-2xl text-gray-800 mb-6"
          >
            Come visit us and experience compassionate care.
          </motion.h3>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            Whether it's your first visit or you're a returning patient, our team is here to provide you 
            with personalized care in a relaxed and friendly environment.
          </motion.p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={formVariants}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden"
        >
          {/* Form background pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fill="#4F46E5" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.6,42.9C65.7,56.6,55.7,69.5,42.2,77.2C28.7,84.9,11.8,87.5,-2.4,90.9C-16.7,94.4,-33.4,98.8,-46.7,93.5C-60,88.2,-69.9,73.3,-78.1,57.7C-86.4,42.1,-93,25.9,-93.3,9.8C-93.5,-6.4,-87.4,-22.5,-81.4,-39.9C-75.5,-57.3,-69.6,-76,-56.9,-83.9C-44.2,-91.8,-24.4,-88.9,-4.6,-82.5C15.2,-76.2,30.5,-66.5,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileFocus="focus"
                variants={inputVariants}
              >
                <label className="block text-gray-700 text-sm font-medium mb-2">FULL NAME*</label>
                <motion.input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputVariants}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  required
                />
              </motion.div>
              
              <motion.div
                whileFocus="focus"
                variants={inputVariants}
              >
                <label className="block text-gray-700 text-sm font-medium mb-2">EMAIL*</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputVariants}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  required
                />
              </motion.div>
              
              <motion.div
                whileFocus="focus"
                variants={inputVariants}
              >
                <label className="block text-gray-700 text-sm font-medium mb-2">PHONE NUMBER*</label>
                <motion.input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputVariants}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  required
                />
              </motion.div>
              
              <motion.div
                whileFocus="focus"
                variants={inputVariants}
              >
                <label className="block text-gray-700 text-sm font-medium mb-2">PREFERRED DATE*</label>
                <motion.input
                  type="text"
                  name="date"
                  value={formState.date}
                  onChange={handleChange}
                  placeholder="dd-mm-yyyy"
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => e.target.type = formState.date ? 'date' : 'text'}
                  whileFocus="focus"
                  variants={inputVariants}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  required
                />
              </motion.div>
            </div>
            
            <motion.div
              whileFocus="focus"
              variants={inputVariants}
            >
              <label className="block text-gray-700 text-sm font-medium mb-2">REASON FOR VISIT</label>
              <motion.select
                name="service"
                value={formState.service}
                onChange={handleChange}
                whileFocus="focus"
                variants={inputVariants}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300"
              >
                <option value="">Select a service</option>
                <option value="preventive">Preventive Care</option>
                <option value="oral_surgery">Oral Surgery</option>
                <option value="emergency">Emergency Care</option>
                <option value="orthodontics">Orthodontics</option>
                <option value="cosmetic">Cosmetic Dentistry</option>
                <option value="repair">Dental Repair</option>
              </motion.select>
            </motion.div>
            
            <motion.div
              whileFocus="focus"
              variants={inputVariants}
            >
              <label className="block text-gray-700 text-sm font-medium mb-2">ADDITIONAL INFORMATION</label>
              <motion.textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows="4"
                whileFocus="focus"
                variants={inputVariants}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300"
              ></motion.textarea>
            </motion.div>
            
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              BOOK APPOINTMENT
            </motion.button>
          </form>
        </motion.div>
        
        {/* Contact Info Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Call Us</h4>
            <p className="text-gray-600">(123) 456-7890</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Email Us</h4>
            <p className="text-gray-600">info@dentalcare.com</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Visit Us</h4>
            <p className="text-gray-600">123 Dental Street, City</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookVisit;