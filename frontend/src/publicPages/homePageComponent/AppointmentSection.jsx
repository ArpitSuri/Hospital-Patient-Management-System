import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AppointmentSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gray-900/70 z-0"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://framerusercontent.com/images/ll7rspXRdV07aQUzy8q2shm1mEU.jpg')`,
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={container}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              variants={item}
            >
              Schedule an appointment with us today!
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-200 mb-10 mx-auto max-w-2xl"
              variants={item}
            >
              Whether you're visiting for a routine check-up or a more advanced procedure, we ensure your oral health is in the best hands, helping you achieve a confident, healthy smile.
            </motion.p>
            
            <motion.div
              className="mb-8"
              variants={item}
            >
              <motion.a
                href="/appointment"
                className="inline-block bg-white text-gray-900 font-medium text-lg rounded-full py-4 px-10 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SCHEDULE AN APPOINTMENT
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;